module ParticleSystems.FishBubbles exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg.Core
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px, Transform(..))
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Random
import Svg exposing (svg, circle, g)
import Svg.Attributes exposing (..)
import Utils exposing (lerp)

type alias Model =
  { bubbles : List Particle
  , fish : Fish
  , frameCount : Int
  }


type alias Fish =
  { position : Vec2
  , size : Float
  , facing : Facing
  }


type Facing
  = Left
  | Right


type alias Particle =
  { id : Int
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  , radius : Float
  , timeToLive : Int
  }


type Msg
  = Step Time.Posix
  | GotVelocity Int (Float, Float)

width : Float
width =
  600


height : Float
height =
  600


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


init : () -> (Model, Cmd Msg)
init _ =
  let
    position =
      Vector2.vec2 (width / 2) (height / 2)
    (bubble, particleCmd) =
      createBubble position 0
  in
  ( { bubbles =
    [ bubble ]
  , fish =
    { position = position
    , size = 150
    , facing = Right
    }
  , frameCount = 1
  }
  , particleCmd
  )


createBubble : Vec2 -> Int -> (Particle, Cmd Msg)
createBubble position id =
  ( { id = id
  , position = position
  , velocity = Vector2.vec2 0 0
  , acceleration = Vector2.vec2 0 -0.05
  , radius = 1/2 * 10
  , timeToLive = 255
  }
  , generateRandomVelocity id
  )
  

generateRandomVelocity : Int -> Cmd Msg
generateRandomVelocity id =
  let
    velocityX =
      Random.float -1 1
    velocityY =
      Random.float 0 0
  in
  Random.generate (GotVelocity id) (Random.pair velocityX velocityY)


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    , Attributes.style <|
      case model.fish.facing of
        Left ->
          "transform: scale(-1, 1)"
        Right ->
          ""
    ] <|
    [ viewBackground width height (Color.rgb 0.0667 0.3059 0.4589)
    , viewFish model.fish
    ] ++ List.map viewBubble model.bubbles


viewBackground : Float -> Float -> Color.Color -> TypedSvg.Core.Svg Msg
viewBackground w h color =
  Svg.rect
    [ Attributes.width (px w)
    , Attributes.height (px h)
    , Attributes.fill <| Fill color
    ]
    []


viewFish : Fish -> TypedSvg.Core.Svg Msg
viewFish fish =
  Svg.svg
    [ Attributes.width (px fish.size)
    , Attributes.height (px fish.size)
    , Attributes.x (px <| Vector2.getX fish.position - fish.size)
    , Attributes.y (px <| Vector2.getY fish.position - fish.size / 2 - 5)
    ]
    [ fishSvg ]


viewBubble : Particle -> TypedSvg.Core.Svg Msg
viewBubble { radius, timeToLive, position } =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill <| Color.fromRgba
      { red = 1
      , green = 1
      , blue = 1
      , alpha = lerp 0 255 0 1 (toFloat timeToLive)
      }
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Step


isDead : Particle -> Bool
isDead p =
  p.timeToLive <= 0


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Step _ ->
      let
        oldFish =
          model.fish
        
        (newPosition, newFacing) =
          let
            position =
              Vector2.add (Vector2.vec2 3 0) model.fish.position
          in
          if Vector2.getX position > width + model.fish.size + 250 then
            (Vector2.setX (-model.fish.size) position, flipFacing model.fish.facing)
          else if Vector2.getX position < -model.fish.size - 250 then
            (position, flipFacing model.fish.facing)
          else
            (position, model.fish.facing)
        
        livingParticles =
          List.filter
            (not << isDead)
            model.bubbles

        updatedLivingParticles =
          List.map
          (\p ->
            let
              newV =
                Vector2.add p.acceleration p.velocity
              newX =
                Vector2.add newV p.position
            in
            { p
              | velocity = newV
              , position = newX
              , timeToLive =
                p.timeToLive - 2
              , radius =
                (height - Vector2.getY newX) / height * 10
            }
          )
          livingParticles
        
        (newParticle, newParticleCmd) =
          if modBy 5 model.frameCount == 0 then
            Tuple.mapFirst Just <| createBubble model.fish.position model.frameCount
          else
            (Nothing, Cmd.none)
      in
      ({ model
        | bubbles =
            case newParticle of
              Nothing ->
                updatedLivingParticles
              Just p ->
                p :: updatedLivingParticles
        , fish =
          { oldFish
            | position =
              newPosition
            , facing =
              newFacing
          }
        , frameCount =
          model.frameCount + 1
      }
      , newParticleCmd
      )
    
    GotVelocity id (vx, vy) ->
      ({ model
        | bubbles =
          List.map
            (\p ->
              if p.id == id then
                { p | velocity = Vector2.vec2 vx vy }
              else
                p
            )
            model.bubbles
      }
      , Cmd.none
      )


flipFacing : Facing -> Facing
flipFacing facing =
  case facing of
    Left ->
      Right
    Right ->
      Left


fishSvg : Svg.Svg msg
fishSvg =
  svg [ version "1.1", x "0px", y "0px", viewBox "0 0 512 512" ] [ Svg.path [ style "fill:#3C66B1;", d "M155.225,223.377c0,0,37.189-90.859,144.589-91.34c100.768-0.451,124.753,59.527,124.753,59.527 L155.225,223.377z" ] [], Svg.path [ style "fill:#8EC1ED;", d "M267.842,339.889c-89.137-24.416-179.415-81.052-179.415-81.052s140.421-92.038,253.44-92.038 s162.587,121.482,162.587,121.482s-49.567,62.594-162.587,62.594c-7.464,0-15.002-0.401-22.575-1.151L267.842,339.889z" ] [], g [ style "opacity:0.4;" ] [ Svg.path [ style "fill:#3C66B1;", d "M504.454,288.279c0,0-31.461-77.103-101.402-108.457c-16.687,7.061-52.699,48.747-53.584,82.508 c-0.941,35.906,12.738,68.547,41.995,84.212C469.521,332.375,504.454,288.279,504.454,288.279z" ] [] ], g [] [ Svg.path [ style "opacity:0.23;fill:#315591;enable-background:new ;", d "M341.867,318.829c-7.464,0-15.002-0.401-22.575-1.151 l-51.451-9.835C208.667,291.633,149,261.23,115.566,242.618c-17.003,9.71-27.139,16.352-27.139,16.352 s90.277,56.635,179.415,81.052l51.451,9.836c7.573,0.75,15.111,1.151,22.575,1.151c113.019,0,162.587-62.594,162.587-62.594 s-3.513-8.607-10.796-21.237C473.573,285.121,424.806,318.829,341.867,318.829z" ] [], Svg.path [ style "fill:#315591;", d "M504.453,295.827h-51.719c-4.169,0-7.546-3.379-7.546-7.546s3.378-7.546,7.546-7.546h51.719 c4.169,0,7.546,3.379,7.546,7.546S508.622,295.827,504.453,295.827z" ] [], Svg.path [ style "fill:#315591;", d "M349.468,268.867c0,0,0.053,91.146-81.623,111.099v-91.062c0-10.128,8.092-18.402,18.217-18.627 L349.468,268.867z" ] [], circle [ style "fill:#315591;", cx "413.916", cy "255.823", r "10.653" ] [] ], Svg.path [ style "fill:#52A2E7;", d "M98.489,258.837c0,0-0.526-31.012-18.339-44.472c-17.814-13.461-72.604-25.84-72.604-25.84 s26.962,52.578,44.774,66.038c0.024,0.018,0.048,0.036,0.072,0.054c2.843,2.135,2.843,6.303,0,8.438 c-0.024,0.018-0.048,0.036-0.072,0.054c-17.813,13.461-44.774,66.039-44.774,66.039s54.79-12.379,72.604-25.84 C97.963,289.849,98.489,258.837,98.489,258.837h-0.001H98.489z" ] [], g [ style "opacity:0.23;" ] [ Svg.path [ style "fill:#315591;", d "M97.786,250.979c-1.385,10.103-5.491,27.435-17.637,36.613c-13.069,9.876-46.044,19.17-62.68,23.419 c-5.928,10.348-9.924,18.139-9.924,18.139s54.79-12.379,72.604-25.84c17.813-13.461,18.339-44.472,18.339-44.472h-0.001h0.001 C98.489,258.837,98.432,255.692,97.786,250.979z" ] [] ], Svg.path [ d "M510.988,292.046c0.301-0.521,0.541-1.081,0.711-1.67c0.019-0.065,0.033-0.132,0.051-0.197 c0.058-0.226,0.107-0.456,0.145-0.69c0.014-0.083,0.028-0.167,0.038-0.252c0.03-0.241,0.048-0.484,0.055-0.731 c0.002-0.06,0.009-0.121,0.009-0.181c0-0.015,0.002-0.029,0.002-0.043c0-0.29-0.02-0.575-0.052-0.856 c-0.008-0.066-0.021-0.132-0.03-0.198c-0.034-0.243-0.079-0.483-0.136-0.718c-0.018-0.075-0.037-0.15-0.057-0.225 c-0.073-0.269-0.16-0.531-0.262-0.787c-0.009-0.022-0.013-0.044-0.022-0.066c-0.004-0.009-0.015-0.035-0.02-0.048 c-0.009-0.021-0.017-0.042-0.026-0.064c-0.924-2.239-13.592-32.307-40.167-62.741c-12.591-14.42-26.222-26.467-40.683-36.055 c-2.522-5.093-9.985-18.036-25.84-30.774c-17.789-14.293-50.2-31.26-103.784-31.26c-0.379,0-0.761,0.001-1.141,0.002 c-58.051,0.26-96.145,26.282-117.878,48.067c-20.962,21.011-30.971,41.871-33.186,46.859 c-19.408,10.593-34.727,20.129-44.142,26.254c-2.109-11.484-7.263-27.794-19.874-37.325c-18.895-14.278-73.188-26.66-75.489-27.179 c-2.864-0.646-5.832,0.422-7.627,2.737c-1.795,2.315-2.088,5.461-0.752,8.068c2.733,5.329,26.392,50.872,44.794,66.868 c-18.4,15.996-42.061,61.541-44.794,66.869c-1.336,2.607-1.043,5.752,0.752,8.068c1.447,1.867,3.662,2.923,5.964,2.923 c0.552,0,1.111-0.061,1.663-0.186c2.301-0.52,56.595-12.902,75.489-27.18c12.701-9.598,17.838-25.815,19.918-37.279 c24.086,15.7,86.309,53.477,155.681,73.549v34.365c0,2.316,1.065,4.505,2.886,5.935c1.343,1.055,2.988,1.611,4.661,1.611 c0.598,0,1.198-0.07,1.791-0.215c20.917-5.109,38.644-15.195,52.628-29.738c6.682,0.562,13.265,0.864,19.604,0.864 c19.361,0,36.878-1.833,52.578-4.803c0.529-0.048,1.05-0.143,1.556-0.3c32.253-6.303,56.696-17.399,73.375-27.242 c27.414-16.177,40.451-32.427,40.992-33.112c0.029-0.036,0.05-0.077,0.078-0.115c0.15-0.196,0.29-0.399,0.42-0.61 C510.909,292.176,510.949,292.112,510.988,292.046z M192.587,183.217c28.697-28.763,64.785-43.443,107.261-43.633 c0.355-0.001,0.706-0.002,1.061-0.002c38.529,0,70.871,9.44,93.58,27.326c1.113,0.876,2.175,1.753,3.195,2.628 c-17.812-6.797-36.516-10.282-55.813-10.282c-48.038,0-104.362,15.744-167.407,46.796c-0.387,0.191-0.766,0.381-1.152,0.573 C178.042,199.62,184.394,191.428,192.587,183.217z M75.601,297.288c-9.926,7.501-34.829,15.378-53.242,20.364 c9.843-17.406,24.479-40.927,34.511-48.521c0.019-0.014,0.037-0.027,0.055-0.042c3.271-2.456,5.147-6.194,5.147-10.253 c0-4.06-1.877-7.797-5.202-10.293c-10.014-7.567-24.661-31.105-34.51-48.523c18.408,4.985,43.305,12.858,53.241,20.365 c14.073,10.634,15.264,36.312,15.338,38.452C90.865,260.976,89.674,286.654,75.601,297.288z M275.391,369.907v-99.226 c0-4.168-3.378-7.546-7.546-7.546c-4.169,0-7.546,3.379-7.546,7.546v59.183c-65.852-19.872-125.891-56.494-148.236-71.023 c31.434-20.416,137.475-84.496,229.806-84.496c16.259,0,31.865,2.614,46.77,7.791c-24.476,16.464-46.715,44.053-46.715,80.194 c0,1.823,0.039,3.615,0.096,5.394c-0.057,0.374-0.096,0.755-0.096,1.146c0,0.213-0.099,21.593-9.635,45.24 c-4.72,11.704-10.83,21.765-18.256,30.203c-0.306,0.298-0.584,0.624-0.836,0.971C303.009,356.532,290.384,364.767,275.391,369.907z M333.902,343.157c4.804-7.083,8.948-14.89,12.381-23.4c1.418-3.516,2.643-6.979,3.712-10.349 c5.176,13.014,12.812,23.82,22.786,32.228c-9.704,1.085-19.999,1.693-30.914,1.693C339.258,343.329,336.592,343.259,333.902,343.157 z M394.772,338.203c-25.055-12.771-37.757-38.28-37.757-75.872c0-34.381,24.622-59.85,48.762-72.953 c4.674,2.34,9.273,4.947,13.792,7.831c0.55,0.486,1.164,0.886,1.823,1.192c13.445,8.842,26.188,20.096,38.17,33.762 c16.284,18.573,27.175,37.347,32.955,48.571h-39.782c-4.169,0-7.546,3.379-7.546,7.546s3.378,7.546,7.546,7.546h33.298 C470.691,308.863,440.888,328.871,394.772,338.203z" ] [], Svg.path [ d "M413.913,237.629c-10.036,0-18.199,8.164-18.199,18.199c0,10.036,8.163,18.199,18.199,18.199s18.199-8.164,18.199-18.199 S423.949,237.629,413.913,237.629z M413.913,258.935c-1.713,0-3.106-1.394-3.106-3.106c0-1.713,1.394-3.106,3.106-3.106 s3.106,1.394,3.106,3.106S415.626,258.935,413.913,258.935z" ] [] ]
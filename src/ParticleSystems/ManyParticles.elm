module ParticleSystems.ManyParticles exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Random
import Utils exposing (lerp)

type alias Model =
  { particles : List Particle
  , nextId : Int
  }


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
    (particle, particleCmd) =
      initParticle 0
  in
  ( { particles =
    [ particle ]
  , nextId =
    1
  }
  , particleCmd
  )


initParticle : Int -> (Particle, Cmd Msg)
initParticle id =
  ( { id = id
  , position = Vector2.vec2 300 40
  , velocity = Vector2.vec2 0 0
  , acceleration = Vector2.vec2 0 0.05
  , radius = 20
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
      Random.float -1 0
  in
  Random.generate (GotVelocity id) (Random.pair velocityX velocityY)


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    border :: List.map viewParticle model.particles


border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


viewParticle : Particle -> Svg Msg
viewParticle { radius, timeToLive, position } =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill <| Color.fromRgba
      { red = 0
      , green = 0
      , blue = 0
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
        livingParticles =
          List.filter
            (not << isDead)
            model.particles
        updatedLivingParticles =
          List.map
          (\p ->
            let
              newVelocity =
                Vector2.add p.acceleration p.velocity
              newPosition =
                Vector2.add newVelocity p.position
            in
            { p
              | velocity =
                newVelocity
              , position =
                newPosition
              , timeToLive =
                p.timeToLive - 2
            }
          )
          livingParticles
        (newParticle, newParticleCmd) =
          initParticle model.nextId
      in
      ({ model
        | particles =
          newParticle :: updatedLivingParticles
        , nextId =
          if model.nextId > 99999 then -- prevent integer overflow
            0
          else
            model.nextId + 1
      }
      , newParticleCmd
      )
    
    GotVelocity id (vx, vy) ->
      ({ model
        | particles =
          List.map
            (\p ->
              if p.id == id then
                { p | velocity = Vector2.vec2 vx vy }
              else
                p
            )
            model.particles
      }
      , Cmd.none
      )

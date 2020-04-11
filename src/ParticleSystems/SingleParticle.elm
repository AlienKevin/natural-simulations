module ParticleSystems.SingleParticle exposing (..)

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
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  , ballRadius : Float
  , timeToLive : Int
  }

type Msg
  = Move Time.Posix
  | GotVelocity (Float, Float)

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
  ( { mass = 1
  , position = Vector2.vec2 300 40
  , velocity = Vector2.vec2 0 0
  , acceleration = Vector2.vec2 0 0.05
  , ballRadius = 20
  , timeToLive = 255
  }
  , generateRandomVelocity
  )
  

generateRandomVelocity : Cmd Msg
generateRandomVelocity =
  let
    velocityX =
      Random.float -1 1
    velocityY =
      Random.float -1 0
  in
  Random.generate GotVelocity (Random.pair velocityX velocityY)


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , point model.ballRadius model.timeToLive model.position
    ]


border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


point : Float -> Int -> Vec2 -> Svg Msg
point radius timeToLive position =
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
  Browser.Events.onAnimationFrame Move


applyForce : Vec2 -> Float -> Vec2 -> Vec2
applyForce force mass acceleration =
  Vector2.add acceleration <| Vector2.scale (1 / mass) force


isDead : Model -> Bool
isDead model =
  model.timeToLive <= 0


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      if isDead model then
        init ()
      else
        let
          newVelocity =
            Vector2.add model.acceleration model.velocity
          newPosition =
            Vector2.add newVelocity model.position
        in
        ({ model
          | velocity =
            newVelocity
          , position =
            newPosition
          , timeToLive =
            model.timeToLive - 2
        }
        , Cmd.none
        )
    
    GotVelocity (vx, vy) ->
      ({ model
        | velocity =
          Vector2.vec2 vx vy
      }
      , Cmd.none
      )

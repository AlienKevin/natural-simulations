module Forces.WallBalls exposing (..)

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

type alias Model =
  { balls : List Ball
  }


type alias Ball =
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  }


type Msg
  = Move Time.Posix
  | GetBalls (List Ball)

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
  ( { balls = []
  }
  , randomBalls
  )


randomBalls : Cmd Msg
randomBalls =
  Random.generate GetBalls <|
    Random.list
      10
      ( Random.map2
        (\mass position ->
          { mass = mass
          , position = position
          , velocity = Vector2.vec2 0 0
          , acceleration = Vector2.vec2 0 0
          }
        )
        (Random.float 0.3 1)
        (Random.map2 Vector2.vec2
          (Random.float 0 width)
          (Random.float 0 height)
        )
      )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    border
    :: List.map
      ball
      model.balls


border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


ball : Ball -> Svg Msg
ball { mass, position } =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px <| ballRadiusFromMass mass)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Move


ballRadiusFromMass : Float -> Float
ballRadiusFromMass mass =
  mass * 30


applyForce : Vec2 -> Float -> Vec2 -> Vec2
applyForce force mass acceleration =
  Vector2.add acceleration <| Vector2.scale (1 / mass) force


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        balls =
          List.map
            moveBall
            model.balls
      }
      , Cmd.none
      )
    GetBalls balls ->
      ({ model |
        balls =
          balls
      }
      , Cmd.none
      )



moveBall : Ball -> Ball
moveBall b =
  let
    r =
      ballRadiusFromMass b.mass
    windForce =
      Vector2.vec2 0.01 0
    gravityForce =
      Vector2.vec2 0 0.1
    oldPosition =
      Vector2.toRecord b.position
    wallForceX =
      if oldPosition.x < r then
        5
      else if oldPosition.x > width - r then
        -5
      else
        0
    wallForceY =
      if oldPosition.y < r then
          5
        else if oldPosition.y > height - r then
          -5
        else
          0
    wallForce =
      Vector2.vec2 wallForceX wallForceY
    newAcceleration =
      applyForce windForce b.mass <|
        applyForce gravityForce b.mass <|
          applyForce wallForce b.mass <|
            Vector2.vec2 0 0
    newVelocity =
      Vector2.add b.velocity newAcceleration
    newPosition =
      Vector2.add b.position newVelocity
  in
  { b |
    velocity =
      newVelocity
    , position =
      newPosition
  }
module Forces.Resistance exposing (..)

import Browser
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
  , resistor : Resistor
  }


type alias Resistor =
  { position : Vec2
  , width : Float
  , height : Float
  , drag : Float
  , color : Color.Color
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
  , resistor =
    { position = Vector2.vec2 0 (height / 2)
    , width = width
    , height = height / 2
    , drag = 0.02
    , color = Color.lightBlue
    }
  }
  , randomBalls
  )


randomBalls : Cmd Msg
randomBalls =
  Random.generate GetBalls <|
    Random.list
      10
      ( Random.map2
        (\mass x ->
          { mass = mass
          , position = Vector2.vec2 x 20
          , velocity = Vector2.vec2 0 0
          , acceleration = Vector2.vec2 0 0
          }
        )
        (Random.float 0.2 1)
        (Random.float 0 width)
      )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , viewResistor model.resistor
    ]
    ++ List.map
      viewBall
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


viewResistor : Resistor -> Svg Msg
viewResistor r =
  let
    {x, y} =
      Vector2.toRecord r.position
  in
  Svg.rect
    [ Attributes.x (px x)
    , Attributes.y (px y)
    , Attributes.width (px r.width)
    , Attributes.height (px r.height)
    , Attributes.fill <| Fill r.color
    ]
    []


viewBall : Ball -> Svg Msg
viewBall { mass, position } =
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
  Time.every 20 Move


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
            (moveBall model.resistor)
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



moveBall : Resistor -> Ball -> Ball
moveBall resistor b =
  let
    r =
      ballRadiusFromMass b.mass
    gravityForce =
      Vector2.vec2 0 0.1
    frictionForce = 
      Vector2.scale (Vector2.lengthSquared b.velocity * resistor.drag * -1)
        <| Vector2.normalize b.velocity
    newAcceleration =
      let
        a = applyForce gravityForce b.mass <|
          Vector2.vec2 0 0
        rp =
          Vector2.toRecord resistor.position
        bp =
          Vector2.toRecord b.position
      in
      if bp.x + r > rp.x && bp.x - r < rp.x + resistor.width
        && bp.y + r > rp.y && bp.y - r < rp.y + resistor.height then
        applyForce frictionForce b.mass a
      else
        a
    newVelocity =
      Vector2.toRecord <| Vector2.add b.velocity newAcceleration
    newPosition =
      Vector2.toRecord <| Vector2.add b.position <| Vector2.fromRecord newVelocity
    newX =
      if newPosition.x < r then
        r
      else if newPosition.x > width - r then
        width - r
      else
        newPosition.x
    
    newY =
      if newPosition.y < r then
        r
      else if newPosition.y > height - r then
        height - r
      else
        newPosition.y

    newXVelocity =
      if newPosition.x < r || newPosition.x > width - r then
        -1 * newVelocity.x
      else
        newVelocity.x
    
    newYVelocity =
      if newPosition.y < r || newPosition.y > height - r then
        -1 * newVelocity.y
      else
        newVelocity.y
  in
  { b |
    velocity =
      Vector2.vec2 newXVelocity newYVelocity
    , position =
      Vector2.vec2 newX newY
  }

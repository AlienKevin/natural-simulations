module Forces.SinkingLogs exposing (..)

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
  { logs : List Log
  , resistor : Resistor
  }


type alias Resistor =
  { position : Vec2
  , width : Float
  , height : Float
  , drag : Float
  , color : Color.Color
  }


type alias Log =
  { mass : Float
  , width : Float
  , height : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  }


type Msg
  = Move Time.Posix
  | GetLogs (List Log)

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
  ( { logs = []
  , resistor =
    { position = Vector2.vec2 0 (height / 2)
    , width = width
    , height = height / 2
    , drag = 0.02
    , color = Color.lightBlue
    }
  }
  , randomLogs
  )


randomLogs : Cmd Msg
randomLogs =
  Random.generate GetLogs <|
    Random.list
      10
      ( Random.map2
        (\w x ->
          { mass = 1
          , width = w
          , height = 15
          , position = Vector2.vec2 x 20
          , velocity = Vector2.vec2 0 0
          , acceleration = Vector2.vec2 0 0
          }
        )
        (Random.float 20 40)
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
      viewLog
      model.logs


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


viewLog : Log -> Svg Msg
viewLog l =
  let
    {x, y} =
      Vector2.toRecord l.position
  in
  Svg.rect
    [ Attributes.x (px <| x - l.width / 2)
    , Attributes.y (px <| y - l.height / 2)
    , Attributes.width (px l.width)
    , Attributes.height (px l.height)
    , Attributes.fill <| Fill Color.brown
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Browser.Events.onAnimationFrame Move


applyForce : Vec2 -> Float -> Vec2 -> Vec2
applyForce force mass acceleration =
  Vector2.add acceleration <| Vector2.scale (1 / mass) force


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        logs =
          List.map
            (moveLog model.resistor)
            model.logs
      }
      , Cmd.none
      )
    GetLogs logs ->
      ({ model |
        logs =
          logs
      }
      , Cmd.none
      )


moveLog : Resistor -> Log -> Log
moveLog resistor b =
  let
    xr =
      b.width / 2
    yr =
      b.height / 2
    gravityForce =
      Vector2.vec2 0 0.1
    frictionForce = 
      Vector2.scale (Vector2.lengthSquared b.velocity * resistor.drag * (b.width * 0.1) * -1)
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
      if bp.x + xr > rp.x && bp.x - xr < rp.x + resistor.width
        && bp.y + yr > rp.y && bp.y - yr < rp.y + resistor.height then
        applyForce frictionForce b.mass a
      else
        a
    newVelocity =
      Vector2.toRecord <| Vector2.add b.velocity newAcceleration
    newPosition =
      Vector2.toRecord <| Vector2.add b.position <| Vector2.fromRecord newVelocity
    newX =
      if newPosition.x < xr then
        xr
      else if newPosition.x > width - xr then
        width - xr
      else
        newPosition.x
    
    newY =
      if newPosition.y < yr then
        yr
      else if newPosition.y > height - yr then
        height - yr
      else
        newPosition.y

    newXVelocity =
      if newPosition.x < xr || newPosition.x > width - xr then
        -1 * newVelocity.x
      else
        newVelocity.x
    
    newYVelocity =
      if newPosition.y < yr || newPosition.y > height - yr then
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

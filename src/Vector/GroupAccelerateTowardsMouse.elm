module Vector.GroupAccelerateTowardsMouse exposing (..)

import Browser
import Browser.Events
import Json.Decode as Decode
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
  { points : List Point
  , mousePosition : Vec2
  , ballRadius : Float
  }

type alias Point =
  { position : Vec2
  , velocity : Vec2
  , acceleration: Vec2
  }

type Msg
  = Move Time.Posix
  | GetPointPositions (List (Float, Float))
  | GetMouseLocation Int Int

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


defaultPosition : Vec2
defaultPosition =
  Vector2.vec2 300 300


init : () -> (Model, Cmd Msg)
init _ =
  ( { points = []
  , mousePosition = Vector2.vec2 0 0
  , ballRadius = 10
  }
  , randomPoints
  )
  

randomPoints =
  let
    randomPosition =
      Random.pair
        (Random.float 0 width)
        (Random.float 0 width)
  in
  Random.generate GetPointPositions <| Random.list 10 randomPosition


view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    ( border
    :: List.map
        (\p ->
          point model.ballRadius p.position
        )
      model.points
    )

border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


point : Float -> Vec2 -> Svg Msg
point radius position =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch
    [ Browser.Events.onAnimationFrame Move
    , Browser.Events.onMouseMove
      ( Decode.map2 GetMouseLocation
        (Decode.field "pageX" Decode.int)
        (Decode.field "pageY" Decode.int)
      )
    ]

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        points =
          List.map
            (movePoint model)
            model.points
      }
      , Cmd.none
      )
    GetMouseLocation mx my ->
      ({ model |
        mousePosition =
          Vector2.vec2 (toFloat mx) (toFloat my)
      }
      , Cmd.none
      )
    GetPointPositions positions ->
      ({ model |
        points =
          List.map
            (\position ->
              { position = Vector2.vec2 (Tuple.first position) (Tuple.second position)
              , velocity = Vector2.vec2 0 0
              , acceleration = Vector2.vec2 0 0
              }
            )
            positions
      }
      , Cmd.none
      )


movePoint : Model -> Point -> Point
movePoint model p =
  let
    r =
      model.ballRadius
    newDirection =
      Vector2.normalize <| Vector2.sub model.mousePosition p.position
    newAcceleration =
      Vector2.scale 0.5 newDirection
    newVelocity =
      limit 5 <| Vector2.add p.velocity newAcceleration
    newPosition =
      Vector2.toRecord <| Vector2.add p.position newVelocity
    newX =
      if newPosition.x <= -r then
        width + r
      else if newPosition.x >= width + r then
        -r
      else
        newPosition.x
    
    newY =
      if newPosition.y <= -r then
        height + r
      else if newPosition.y >= height + r then
        -r
      else
        newPosition.y
  in
  { p |
    velocity =
      newVelocity
    , position =
      Vector2.vec2 newX newY
  }


limit : Float -> Vec2 -> Vec2
limit maxMagnitude v =
  let
    magnitude =
      Vector2.length v 
  in
  if magnitude > maxMagnitude then
    Vector2.scale (maxMagnitude / magnitude) v
  else
    v


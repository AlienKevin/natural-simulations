module Vector.BrakingCar exposing (..)

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


type alias Model =
  { position : Vec2
  , velocity : Vec2
  , acceleration: Vec2
  , ballRadius : Float
  }

type Msg
  = Move Time.Posix
  | Accelerate
  | Break
  | Stay

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
  ( { position = defaultPosition
  , velocity = Vector2.vec2 0 0
  , acceleration = Vector2.vec2 0 0
  , ballRadius = 20
  }
  , Cmd.none
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , point model.ballRadius model.position
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
    [ Browser.Events.onKeyDown keyDecoder
    , Browser.Events.onAnimationFrame Move
    ]


keyDecoder : Decode.Decoder Msg
keyDecoder =
  Decode.map toMsg (Decode.field "key" Decode.string)


toMsg : String -> Msg
toMsg string =
  case string of
    "ArrowLeft" ->
      Break

    "ArrowRight" ->
      Accelerate

    _ ->
      Stay

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      let
        r =
          model.ballRadius
        newVelocity =
          let
            {x, y} =
              Vector2.toRecord <| limit 10 <| Vector2.add model.velocity model.acceleration
          in
          if x < 0 then
            Vector2.vec2 0 0
          else
            Vector2.vec2 x y
        newPosition =
          Vector2.toRecord <| Vector2.add model.position newVelocity
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
      ({ model |
        velocity =
          newVelocity
        , acceleration =
          Vector2.vec2 0 0
        , position =
          Vector2.vec2 newX newY
      }
      , Cmd.none
      )
    Accelerate ->
      ({ model |
        acceleration =
          Vector2.vec2 0.5 0
      }
      , Cmd.none
      )
    Break ->
      ({ model |
        acceleration =
          Vector2.vec2 -0.2 0
      }
      , Cmd.none
      )
    Stay ->
      ({ model |
        acceleration =
          Vector2.vec2 0 0
      }
      , Cmd.none
      )


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


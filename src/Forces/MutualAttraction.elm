module Forces.MutualAttraction exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import TypedSvg.Events
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Random.Float
import Random
import List.Extra

type alias Model =
  { movers : List Mover
  }


type alias Mover =
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  }


type Msg
  = Move Time.Posix
  | GetMovers (List Mover)

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
  ( { movers =
    []
  }
  , generateMovers
  )


generateMovers =
  Random.generate GetMovers <|
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
        (Random.Float.normal 0.7 0.7)
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
      viewMover
      model.movers


radiusFromMass : Float -> Float
radiusFromMass mass =
  mass * 20


border =
  Svg.rect
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.noFill
    , Attributes.stroke Color.black
    , Attributes.strokeWidth (px 3)
    ]
    []


viewMover : Mover -> Svg Msg
viewMover { mass, position } =
  viewPoint [] (radiusFromMass mass) position


viewPoint : List (TypedSvg.Core.Attribute Msg)  -> Float -> Vec2 -> Svg Msg
viewPoint attributes radius position =
  let
    {x, y} =
      Vector2.toRecord position
  in
  Svg.circle
    ( [ Attributes.cx (px x)
    , Attributes.cy (px y)
    , Attributes.r (px radius)
    , Attributes.fill <| Fill Color.grey
    ] ++ attributes
    )
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Sub.batch
    [ Browser.Events.onAnimationFrame Move
    ]


applyForce : Vec2 -> Float -> Vec2 -> Vec2
applyForce force mass acceleration =
  Vector2.add acceleration <| Vector2.scale (1 / mass) force


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    Move _ ->
      ({ model |
        movers =
          List.indexedMap
            (\index mover ->
              updateMover mover <| List.Extra.removeAt index model.movers
            )
            model.movers
      }
      , Cmd.none
      )

    GetMovers movers ->
      ({ model |
        movers =
          movers
      }
      , Cmd.none
      )


updateMover : Mover -> List Mover -> Mover
updateMover mover others =
  let
    newAcceleration =
      List.foldl
        (\attractor acceleration->
          let
            attractionForce =
              calculateAttraction mover attractor
          in
          applyForce attractionForce attractor.mass acceleration
        )
        (Vector2.vec2 0 0)
        others
    newVelocity =
       Vector2.add mover.velocity newAcceleration
    newPosition =
      Vector2.add mover.position newVelocity
    oldMover =
      mover
    in
    { oldMover |
      velocity =
        newVelocity
      , position =
        newPosition
    }


calculateAttraction : Mover -> Mover -> Vector2.Vec2
calculateAttraction mover attractor  =
  let
    attractionDistance =
      limit 5 25 <| Vector2.sub attractor.position mover.position
    attractionDir =
      Vector2.normalize <| attractionDistance
    attractionDistanceSquared =
      Vector2.lengthSquared attractionDistance
    attractionForce =
      Vector2.scale ( 5 * attractor.mass * attractor.mass / attractionDistanceSquared ) attractionDir 
  in
  attractionForce


limit : Float -> Float -> Vec2 -> Vec2
limit minMagnitude maxMagnitude v =
  let
    magnitude =
      Vector2.length v 
  in
  if magnitude > maxMagnitude then
    Vector2.scale (maxMagnitude / magnitude) v
  else if magnitude < minMagnitude then
    Vector2.scale (minMagnitude / magnitude) v
  else
    v
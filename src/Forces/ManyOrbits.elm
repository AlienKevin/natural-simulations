module Forces.ManyOrbits exposing (..)

import Browser
import Color
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)
import TypedSvg.Events
import Time
import Math.Vector2 as Vector2 exposing (Vec2)
import Draggable
import Random

type alias Model =
  { movers : List Mover
  , attractor : Attractor
  , drag : Draggable.State ()
  }
  
type alias Attractor =
  { mass : Float
  , position : Vec2
  , fill : Color.Color
  }

type alias Mover =
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , acceleration : Vec2
  }


type Msg
  = Move Time.Posix
  | OnDragBy Draggable.Delta
  | DragMsg (Draggable.Msg ())
  | AttractorHovered
  | AttractorClicked
  | AttractorMouseOut
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
  , attractor =
    { mass = 2
    , position = Vector2.vec2 ( width / 2 ) ( height / 2 )
    , fill = Color.lightBlue
    }
  , drag = Draggable.init
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
          , velocity = Vector2.vec2 1 0
          , acceleration = Vector2.vec2 0 0
          }
        )
        (Random.float 0.2 1)
        (Random.map2 Vector2.vec2
          (Random.float 0 width)
          (Random.float 0 height)
        )
      )


dragConfig : Draggable.Config () Msg
dragConfig =
    Draggable.basicConfig OnDragBy
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    ] <|
    [ border
    , viewAttractor model.attractor
    ]
    ++ List.map
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


viewAttractor : Attractor -> Svg Msg
viewAttractor { mass, position, fill } = 
  viewPoint
    ( [ Draggable.mouseTrigger () DragMsg
      , TypedSvg.Events.onMouseOver AttractorHovered
      , TypedSvg.Events.onMouseOut AttractorMouseOut
      , Attributes.fill <| Fill fill
      ]
      ++ Draggable.touchTriggers () DragMsg
    )
    (radiusFromMass mass)
    position

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
subscriptions { drag } =
  Sub.batch
    [ Time.every 10 Move
    , Draggable.subscriptions DragMsg drag
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
          List.map
            (updateMover model.attractor)
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

    AttractorMouseOut ->
      changeAttractorFill Color.lightBlue model

    AttractorHovered ->
      changeAttractorFill Color.blue model

    AttractorClicked ->
      changeAttractorFill Color.darkBlue model

    OnDragBy ( dx, dy ) ->
      let
        {x, y} =
          Vector2.toRecord model.attractor.position
        attractor =
          model.attractor
      in
      ( { model |
        attractor =
          { attractor |
            position =
              Vector2.vec2 (x + dx) (y + dy)
          }
      }
      , Cmd.none
      )

    DragMsg dragMsg ->
        Draggable.update dragConfig dragMsg model


updateMover : Attractor -> Mover -> Mover
updateMover attractor mover =
  let
    attractionDistance =
      limit 5 25 <| Vector2.sub attractor.position mover.position
    attractionDir =
      Vector2.normalize <| attractionDistance
    attractionDistanceSquared =
      Vector2.lengthSquared attractionDistance
    attractionForce =
      Vector2.scale ( 5 * attractor.mass * mover.mass / attractionDistanceSquared ) attractionDir 
    newAcceleration =
        applyForce attractionForce mover.mass <|
          Vector2.vec2 0 0
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


changeAttractorFill : Color.Color -> Model -> ( Model, Cmd Msg)
changeAttractorFill fill model =
  let
    oldAttractor =
      model.attractor
  in
  ({ model |
    attractor =
      { oldAttractor |
        fill =
          fill
      }
  }
  , Cmd.none
  )


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
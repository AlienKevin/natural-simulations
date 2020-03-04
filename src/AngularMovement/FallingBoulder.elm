module AngularMovement.FallingBoulder exposing (..)

import Browser
import Browser.Events
import Color
import Html exposing (Html)
import Html.Events
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), Transform(..), px)
import Time
import Math.Vector2 as Vector2 exposing (Vec2)

type alias Model =
  { mass : Float
  , position : Vec2
  , velocity : Vec2
  , theta : Float
  , omega : Float
  , ballRadius : Float
  , pushing : Bool
  }

type Msg
  = Move Time.Posix
  | Push
  | Release

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
  , position = Vector2.vec2 0 0
  , velocity = Vector2.vec2 0 0
  , theta = 0
  , omega = 0
  , ballRadius = 35
  , pushing = False
  }
  , Cmd.none
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px width)
    , Attributes.height (px height)
    , Attributes.viewBox 0 0 width height
    , Html.Events.onMouseDown Push
    , Html.Events.onMouseUp Release
    ] <|
    [ border
    , viewHill model.ballRadius
    , viewBall model.ballRadius model.position model.theta
    , viewPusher model.ballRadius model.position
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


viewHill : Float -> Svg Msg
viewHill ballRadius =
  let
    dy =
      ballRadius * sqrt 2
  in
  Svg.polygon
    [ Attributes.points [ (0, dy), ( width, height + dy ), (0, height) ]
    , Attributes.fill <| Fill <| Color.darkGreen
    ]
    []


viewBall : Float -> Vec2 -> Float -> Svg Msg
viewBall radius position theta =
  let
    gradient =
      Svg.defs []
        [ Svg.radialGradient
          [ Attributes.id "ballGradient"
          , Attributes.cx (TypedSvg.Types.percent 20)
          , Attributes.cy (TypedSvg.Types.percent 20)
          , Attributes.r (TypedSvg.Types.percent 50)
          , Attributes.fx (TypedSvg.Types.percent 20)
          , Attributes.fy (TypedSvg.Types.percent 20)
          ]
          [ Svg.stop
            [ Attributes.offset "0%"
            , Attributes.style "stop-color:#FF00FF;"
            ]
            []
          , Svg.stop
            [ Attributes.offset "100%"
            , Attributes.style "stop-color:#FFBD2E;"
            ]
            []
          ]
        ]
    {x, y} =
      Vector2.toRecord position
    ballBody =
      Svg.circle
        [ Attributes.cx (px 0)
        , Attributes.cy (px 0)
        , Attributes.r (px radius)
        , TypedSvg.Core.attribute "fill" "url(#ballGradient)"
        , Attributes.transform
          [ Translate x y
          , Rotate theta 0 0
          ]
        ]
        []
  in
  Svg.g []
    [ gradient
    , ballBody
    ]


viewPusher : Float -> Vec2 -> Svg Msg
viewPusher ballRadius position =
  let
    { x, y } =
      Vector2.toRecord position
  in
  Svg.image
    [ Attributes.transform
      [ Translate x y
      ]
    , TypedSvg.Core.attribute "href" "/media/hopper-jumping.png"
    , Attributes.x <| px <| ballRadius * 2 * 0.15
    , Attributes.y <| px <| ballRadius * 2 * 0.35
    , Attributes.width <| px 45
    , Attributes.height <| px 55
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
  let
    gravityForce =
      Vector2.vec2 0.01 0.01
    pushForce =
      Vector2.vec2 -0.015 -0.015
    netForce =
      if model.pushing then
        [ gravityForce, pushForce ]
      else
        [ gravityForce ]
  in
  case msg of
    Move _ ->
      ( updateMovement netForce model
      , Cmd.none
      )
    Push ->
      ( { model |
        pushing = True
      }
      , Cmd.none
      )
    Release ->
      ( { model |
        pushing = False
      }
      , Cmd.none
      )


updateMovement : List Vec2 -> Model -> Model
updateMovement forces model =
  let
    newAcceleration =
      List.foldl
        (\force acceleration ->
          applyForce force model.mass acceleration
        )
        (Vector2.vec2 0 0)
        forces
    newAccelerationDirection =
      sign <| Vector2.getX newAcceleration
    velocityDirection =
      sign <| Vector2.getX model.velocity
    stuckAtBottomOfHill =
      Vector2.getX model.position >= (width - model.ballRadius)
      && (velocityDirection > 0 )
    newVelocity =
      if stuckAtBottomOfHill then
        Vector2.vec2 0 0
      else
        Vector2.add model.velocity newAcceleration
    newPosition =
      if stuckAtBottomOfHill then
        model.position
      else
        Vector2.add model.position newVelocity
    newAlpha =
      Vector2.length newAcceleration * newAccelerationDirection * 1.5
    newOmega =
      if stuckAtBottomOfHill then
        0
      else
        model.omega + newAlpha
      
    newTheta =
      if stuckAtBottomOfHill then
        model.theta    
      else
        model.theta + newOmega
  in
  { model |
    velocity =
      newVelocity
    , position =
      newPosition
    , omega =
      newOmega
    , theta =
      newTheta
  }


sign : Float -> Float
sign n =
  if n < 0 then
    -1
  else if n == 0 then
    0
  else
    1


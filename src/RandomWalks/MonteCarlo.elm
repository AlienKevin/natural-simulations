module RandomWalks.MonteCarlo exposing (..)

import Browser
import Color
import Html exposing (Html)
import Random
import Time
import TypedSvg as Svg
import TypedSvg.Core exposing (Svg)
import TypedSvg.Attributes as Attributes
import TypedSvg.Types exposing (Fill(..), px)

type alias Position =
  Float

type alias Model =
  { positions : List Position
  }

type Msg
  = GetPosition Time.Posix
  | NewPosition (Position, Float)

main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


defaultPosition : Position
defaultPosition =
  0


stepCmd : Cmd Msg
stepCmd =
  Random.generate NewPosition <| Random.pair (Random.float 0 1) (Random.float 0 1)


init : () -> (Model, Cmd Msg)
init _ =
  ( { positions = []
  }
  , stepCmd
  )
  

view : Model -> Html Msg
view model =
  Svg.svg
    [ Attributes.width (px 600)
    , Attributes.height (px 600)
    , Attributes.viewBox 0 0 600 600
    ] <|
    List.map
      point
      model.positions


point : Position -> Svg Msg
point position =
  Svg.circle
    [ Attributes.cx (px <| position * 600)
    , Attributes.cy (px 300)
    , Attributes.r (px <| position * 30)
    , Attributes.fill <| Fill ( Color.rgba 0 0 0 0 )
    , Attributes.stroke <| Color.black
    ]
    []


subscriptions : Model -> Sub Msg
subscriptions _ =
  Time.every 50 GetPosition

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case msg of
    GetPosition _ ->
      ( model
      , stepCmd
      )
    NewPosition (newPosition, probability) ->
      if probability < newPosition then
        ({ model |
          positions =
            newPosition :: model.positions
        }
        , Cmd.none
        )
      else
        ( model
        , stepCmd
        )

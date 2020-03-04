import { promises, writeFileSync } from 'fs';
import { join } from 'path';

let [demoImports, demoModelDefinitions, demoAnimationDefinitions,
  demoMsgDefinitions, demoSelectionsInUpdate, demoUpdates,
  demoSubscriptions, demoSelections, demoViews] =
  Array(9).fill("") as string[];

buildMain("src");

function indent(indentations: number) {
  return "\n" + " ".repeat(indentations * 2);
}

function group(indentations: number, lines: string[]) {
  return (
    indent(indentations)
    + lines.join(indent(indentations))
  );
}

async function buildMain(sourceDir: string) {
  try {
    const files = await promises.readdir(sourceDir);

    for (const file of files) {
      // Get the full paths
      const sourcePath = join(sourceDir, file);
      const fileDir = sourcePath.replace(/\.elm/, "").split("/").slice(1).join(".");
      const fileName = file.replace(/\.elm/, "");
      const demoName = fileDir.replace(/\.elm/, "").replace(/\./g, "");
      const demoMsgName = demoName + "Msg";
      const demoAnimName = demoName + "Anim";

      // Stat the file to see if we have a file or dir
      const stat = await promises.stat(sourcePath);
      if (stat.isFile()) {
        if (!["Utils", "Main", "Asteroids", "Basic", "SimplexNoise"].includes(fileName)) {
          // eg: import Vector.BouncingBall as VectorBouncingBall
          demoImports +=
            indent(0) + "import " + fileDir + " as " + demoName;

          // eg: | VectorBouncingBallAnim VectorBouncingBall.Model
          demoModelDefinitions +=
            indent(1) + "| " + demoAnimName + " " + demoName + ".Model";

          // eg: | VectorBouncingBall
          demoAnimationDefinitions +=
            indent(1) + "| " + demoName;

          // eg: | VectorBouncingBallMsg VectorBouncingBall.Msg
          demoMsgDefinitions +=
            indent(1) + "| " + demoMsgName + " " + demoName + ".Msg";

          // eg: VectorBouncingBall ->
          // let
          //   ( subModel, subCmd ) =
          //     VectorBouncingBall.init ()
          // in
          // ( VectorBouncingBallAnim <|
          //   subModel
          // , subCmd
          //   |> Cmd.map VectorBouncingBallMsg
          // )
          demoSelectionsInUpdate +=
            group(
              4
              , [demoName + " ->"
                , "  let"
                , "    ( subModel, subCmd ) ="
                , "      " + demoName + ".init ()"
                , "  in"
                , "  ( { model |"
                , "    demoModel ="
                , "      " + demoAnimName + " <|"
                , "      subModel"
                , "  }"
                , "  , subCmd"
                , "    |> Cmd.map " + demoMsgName
                , "  )"
                , ""
              ]
            );

          // eg: ( BouncingBallMsg subMsg, BouncingBallAnim subModel ) ->
          // let
          //   ( newSubModel, subCmd ) =
          //     subModel
          //       |> VectorBouncingBall.update subMsg
          // in
          // ( BouncingBallAnim newSubModel
          // , subCmd
          //   |> Cmd.map BouncingBallMsg
          // )
          demoUpdates +=
            group(
              2
              , ["( " + demoMsgName + " subMsg, " + demoAnimName + " subModel ) ->"
                , "  let"
                , "    ( newSubModel, subCmd ) ="
                , "      subModel"
                , "        |> " + demoName + ".update subMsg"
                , "  in"
                , "  ( { model |"
                , "    " + "demoModel ="
                , "      " + demoAnimName + " newSubModel"
                , "  }"
                , "  , subCmd"
                , "    |> Cmd.map " + demoMsgName
                , "  )"
                , ""
              ]
            );

          // eg: VectorBouncingBallAnim subModel ->
          // VectorBouncingBall.subscriptions subModel
          //   |> Sub.map BouncingBallMsg
          demoSubscriptions +=
            group(
              2
              , [demoAnimName + " subModel ->"
                , "  " + demoName + ".subscriptions subModel"
                , "    |> Sub.map " + demoMsgName
                , ""
              ]
            );

          // eg: , E.el
          // [ onClick (Select VectorBouncingBall)
          // , E.pointer
          // ]
          // (E.text "Bouncing Ball")
          demoSelections +=
            group(
              4
              , [", E.link"
                , "  [ onClick (Select " + demoName + ")"
                , "  , E.pointer"
                , "  ]"
                , "  { url = \"#" + demoName + "\""
                , "  , label = (E.text \"" + fileName + "\")"
                , "  }"
              ]
            )

          // eg: VectorBouncingBallAnim subModel ->
          // VectorBouncingBall.view subModel
          //   |> Html.map VectorBouncingBallMsg
          demoViews +=
            group(
              3
              , [ demoAnimName + " subModel ->"
                , "  " + demoName + ".view subModel"
                , "    |> Html.map " + demoMsgName
                , ""
              ]
            );
        }
      }
      else if (stat.isDirectory()) {
        buildMain(sourcePath);
      }
      const output = outputMain();
      writeFileSync("src/Main.elm", output);
    }
  } catch (e) {
    console.error(e);
  }
}

function outputMain() {
  return `module Main exposing (main)

import Browser
import Browser.Dom exposing (Viewport)
import Browser.Events
import Task
import Color
import Element as E exposing (Device, DeviceClass(..), Orientation(..))
import Element.Events exposing (onClick)
import Element.Font as Font
import Element.Background as Background
import Element.Border as Border
import Html exposing (Html)
import Html.Attributes
import TypedSvg as Svg
import TypedSvg.Core
import TypedSvg.Attributes as SvgAttributes
import TypedSvg.Types as SvgTypes
import RandomWalks.Basic as RandomWalksBasic
`
    + demoImports
    + `


-- INIT


init : () -> ( Model, Cmd Msg )
init _ =
  let
    ( subModel, subCmd ) =
      RandomWalksBasic.init ()
  in
  ( {demoModel =
    RandomWalksBasicAnim subModel
  , device =
    Nothing
  }
  , Cmd.batch
    [ subCmd
      |> Cmd.map BasicWalkerMsg
    , Task.perform
      (\\{viewport} ->
        GotViewport
          (round viewport.width)
          (round viewport.height)
      )
      Browser.Dom.getViewport
    ]
  )


-- MODEL


type alias Model =
  { demoModel : DemoModel
  , device: Maybe Device
  }

type DemoModel
  = RandomWalksBasicAnim RandomWalksBasic.Model
`
    + demoModelDefinitions
    + `

type Animation
  = RandomWalksBasic
`
    + demoAnimationDefinitions
    + `

-- UPDATE


type Msg
  = Select Animation
  | GotViewport Int Int
  | BasicWalkerMsg RandomWalksBasic.Msg`
    + demoMsgDefinitions
    + `

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case ( msg, model.demoModel ) of
    ( Select anim, _ ) ->
      case anim of
        RandomWalksBasic ->
          let
            ( subModel, subCmd ) =
              RandomWalksBasic.init ()
          in
          ( { model |
            demoModel =
              RandomWalksBasicAnim subModel
          }
          , subCmd
            |> Cmd.map BasicWalkerMsg
          )
`
    + demoSelectionsInUpdate
    + `
    ( BasicWalkerMsg subMsg, RandomWalksBasicAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksBasic.update subMsg
      in
      ( { model |
        demoModel =
          RandomWalksBasicAnim newSubModel
      }
      , subCmd
        |> Cmd.map BasicWalkerMsg
      )
`
    + demoUpdates
    + `
    ( GotViewport w h, _ ) ->
      ({ model |
        device =
          Just <| E.classifyDevice
            { width =
              w
            , height =
              h
            }
      }
      , Cmd.none
      )
    ( _, _ ) ->
      ( model, Cmd.none )


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions anim =
  Sub.batch
  [ Browser.Events.onResize GotViewport
  , case anim.demoModel of
    RandomWalksBasicAnim subModel ->
      RandomWalksBasic.subscriptions subModel
        |> Sub.map BasicWalkerMsg
`
    + demoSubscriptions
    + `
  ]

-- VIEW


defaultWidth : Float
defaultWidth =
  600


defaultHeight : Float
defaultHeight =
  600


view : Model -> Html Msg
view model =
  E.layout
    [ E.width E.fill
    , E.height E.fill
    , Font.family
      [ Font.typeface "Helvetica"
      , Font.sansSerif
      ]
    , E.padding 20
    , E.spacing 15
    , E.clipY
    ]
    ( ( case model.device of
      Just device ->
        case (device.class, device.orientation) of
          (Phone, Portrait) ->
            E.column
          (_, _) ->
            E.wrappedRow
      Nothing ->
        E.wrappedRow
      )
      [ E.width E.fill
      , E.height E.fill
      , E.spacing 20
      ]
      [ E.column
        [ E.height E.fill
        , E.width E.fill
        , E.spacing 20
        ]
        [ E.el
          [ Font.family
            [ Font.typeface "Kalam"
            , Font.serif
            ]
          , Font.size 30
          , E.padding 20
          , Background.color <| toElmUiColor Color.lightGreen
          , E.width E.fill
          , Border.rounded 20
          ]
          (E.text "Natural Simulations")
        , E.paragraph
          []
          [ E.text "Natural simulations in Elm based on \\"Advanced JS: Natural Simulations\\" from Khan Academy."
          ]
        , E.el
          [ E.centerX
          ]
          ( model
            |> demoView
            |> E.html
          )
        ]
      , E.column
        [ E.spacing 20
        , E.scrollbarY
        , E.width E.fill
        , E.htmlAttribute <| Html.Attributes.style "height" "calc(100vh - 25px)"
        , E.htmlAttribute <| Html.Attributes.id "text-panel"
        , E.htmlAttribute <| Html.Attributes.classList [ ("scrollable", True) ]
        ]
        [ E.link
          [ onClick (Select RandomWalksBasic)
          , E.pointer
          ]
          { url = "#RandomWalksBasic"
          , label = (E.text "Basic Walker")
          }`
    + demoSelections
    + `
        ]
      ]
    )


demoView : Model -> Html Msg
demoView model =
  Svg.svg
    [ SvgAttributes.width (SvgTypes.px defaultWidth)
    , SvgAttributes.height (SvgTypes.px defaultHeight)
    , SvgAttributes.viewBox 0 0 defaultWidth defaultHeight
    ]
  <|
    [ border
    , case model.demoModel of
      RandomWalksBasicAnim subModel ->
        RandomWalksBasic.view subModel
          |> Html.map BasicWalkerMsg`
    + demoViews
    + `
    ]


border : TypedSvg.Core.Svg Msg
border =
  Svg.rect
    [ SvgAttributes.width (SvgTypes.px defaultWidth)
    , SvgAttributes.height (SvgTypes.px defaultHeight)
    , SvgAttributes.noFill
    , SvgAttributes.stroke Color.black
    , SvgAttributes.strokeWidth (SvgTypes.px 3)
    ]
    []


-- MAIN


main : Program () Model Msg
main =
  Browser.element
    { init = init
    , view = view
    , update = update
    , subscriptions = subscriptions
    }


toElmUiColor : Color.Color -> E.Color
toElmUiColor color =
  let
    {red, green, blue, alpha } =
      Color.toRgba color
  in
  E.rgba red green blue alpha
`;
}
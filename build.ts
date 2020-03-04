import { promises, writeFileSync } from 'fs';
import { join } from 'path';

let [demoImports, demoModelDefinitions, demoAnimationDefinitions,
  demoMsgDefinitions, demoSelectionsInUpdate, demoUpdates,
  demoSubscriptions, demoSelections, demoViews] =
  Array(9).fill("") as string[];

demoSelections = `[ E.html <| Html.h1 []
  [ Html.text "Table of Contents" ]
, E.html <| Html.h1 [ Html.Attributes.id "randomness" ]
  [ Html.text "Randomness" ]
, E.html <| Html.p []
  [ Html.text "Random walks" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksBasic) ]
      [ Html.text "Basic walker" ]
    , Html.li []
      [ Html.a [ Html.Events.onClick (Select RandomWalksImproved) ]
        [ Html.text "Improved walker" ]
      ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Random blobber" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Same as "
    , Html.a [ Html.Events.onClick (Select RandomWalksImproved) ]
      [ Html.text "Improved walker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Probability & non-uniform distributions" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksDirected) ]
      [ Html.text "Directed walker" ]
    , Html.text " that moves to the right"
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Up walker" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "You can slightly modify the "
    , Html.a [ Html.Events.onClick (Select RandomWalksDirected) ]
      [ Html.text "Directed walker" ]
    , Html.text " to make it move up"
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Normal distribution of random numbers" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksNormalDistribution) ]
      [ Html.text "Normal Distribution" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Gaussian walk" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksGaussian) ]
      [ Html.text "Gaussian walker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Custom distribution of random numbers" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksMonteCarlo) ]
      [ Html.text "Monte Carlo" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Lévy walker" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksLevy) ]
      [ Html.text "Lévy Walker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Project: Paint splatter" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select RandomWalksPaintSplatter) ]
      [ Html.text "Paint Splatter" ]
    ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "noise" ]
  [ Html.text "Noise" ]
, E.html <| Html.p []
  [ Html.text "Perlin noise" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select NoisePerlin) ]
      [ Html.text "Perlin Mountains" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select NoisePerlinWalker) ]
      [ Html.text "Perlin Walker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Noisy step walker" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select NoisePerlinStepWalker) ]
      [ Html.text "Perlin Step Walker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Two dimensional noise" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select NoiseRandomBox) ]
      [ Html.text "Random Box" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select NoisePerlinBox) ]
      [ Html.text "Perlin Box" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Animated noise" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select NoiseAnimatedBox) ]
      [ Html.text "Animated Box" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Project: Mountain range" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select NoiseMountainRange) ]
      [ Html.text "Mountain Range" ]
    ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "vector" ]
  [ Html.text "Vector" ]
, E.html <| Html.p []
  [ Html.text "Intro to vectors" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorBouncingBall) ]
      [ Html.text "Bouncing Ball" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorBouncingBallWithVector) ]
      [ Html.text "Bouncing Ball With Vector" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Vector walker" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorWalkerWithVector) ]
      [ Html.text "Walker With Vector" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "More vector math" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorMouseTracing) ]
      [ Html.text "Mouse Tracing" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorMouseTracingScaled) ]
      [ Html.text "Mouse Tracing Halfed" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Lightsaber" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorScalingSaber) ]
      [ Html.text "Scaling saber" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Vector magnitude and normalization" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorMouseTracingWithMagnitude) ]
      [ Html.text "Mouse Tracing Showing Magnitude" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorMouseTracingNormalized) ]
      [ Html.text "Mouse Tracing Normalized" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: magnitude visualizer" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try create it yourself!" ]
  ]
, E.html <| Html.p []
  [ Html.text "Vector motion" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorConstantVelocity) ]
      [ Html.text "Constant Velocity" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorConstantAcceleration) ]
      [ Html.text "Constant Acceleration" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorRandomAcceleration) ]
      [ Html.text "Random Acceleration" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Braking car" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorBrakingCar) ]
      [ Html.text "Braking Car" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Static functions vs. instance methods" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "There are no mutable states in Elm so all functions always return new values while keeping old values the same, similar to static functions in JavaScript." ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Static functions" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "We always use static functions in Elm. So nothing to do here." ]
  ]
, E.html <| Html.p []
  [ Html.text "Interactive vector motion" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorAccelerateTowardsMouse) ]
      [ Html.text "Single Ball Accelerates Towards Mouse" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorGroupAccelerateTowardsMouse) ]
      [ Html.text "Swarm of Balls Accelerates Towards Mouse" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: mouse stalker" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select VectorMouseStalker) ]
      [ Html.text "Mouse Stalker" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Project: Computational creatures" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try create it yourself!" ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "forces" ]
  [ Html.text "Forces" ]
, E.html <| Html.p []
  [ Html.text "Newton's laws of motion" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesBlowingWind) ]
      [ Html.text "Ball Blown by Wind" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Floating balloon" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesFloatingBalloon) ]
      [ Html.text "Floating Balloon" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Motion of many objects" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesManyBalls) ]
      [ Html.text "Many Balls" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Wall balls" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesWallBalls) ]
      [ Html.text "Wall Balls" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Modeling gravity and friction" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesBlowingWindWithGravity) ]
      [ Html.text "Ball Blown by Wind obeying gravity" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesBlowingWindWithGravityAndFriction) ]
      [ Html.text "Ball Blown by Wind obeying gravity with friction" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Speed bumps" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try it yourself!" ]
  ]
, E.html <| Html.p []
  [ Html.text "Air and fluid resistance" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesResistance) ]
      [ Html.text "Fluid Resistance" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Sinking logs" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesSinkingLogs) ]
      [ Html.text "Sinking Logs" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Gravitational attraction" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesSingleOrbit) ]
      [ Html.text "Single Orbit" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesManyOrbits) ]
      [ Html.text "Many Orbits" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Artwork generator" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesArtworkGenerator) ]
      [ Html.text "Artwork Generator with color gradients depending on speed" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Mutual attraction" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesMutualAttraction) ]
      [ Html.text "Mutual Attraction" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Mutual repulsion" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select ForcesMutualRepulsion) ]
      [ Html.text "Mutual Repulsion" ]
    ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "angularmovements" ]
  [ Html.text "Angular Movements" ]
, E.html <| Html.p []
  [ Html.text "Angles and Units" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "No code examples" ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Spinning baton" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementSpinningBaton) ]
      [ Html.text "Spinning Baton" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Angular velocity" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementAcceleratingBaton) ]
      [ Html.text "Accelerating Baton" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementManyOrbitsWithRotation) ]
      [ Html.text "Many Orbits with Self-rotation" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementManyOrbitsWithDynamicRotation) ]
      [ Html.text "Many Orbits with Dynamic Self-rotation Depending on Acceleration in x Direction" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Falling boulder" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementFallingBoulder) ]
      [ Html.text "Falling Boulder" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Trigonometry" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "No code examples" ]
  ]
, E.html <| Html.p []
  [ Html.text "Practice: Trigonometric ratios in right triangles" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "No code examples" ]
  ]
, E.html <| Html.p []
  [ Html.text "Pointing towards movement" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementAccelerateTowardsMouse) ]
      [ Html.text "Accelerate Towards Mouse" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Turning car" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try it yourself!" ]
  ]
, E.html <| Html.p []
  [ Html.text "Polar coordinates" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementPolarSwing) ]
      [ Html.text "Polar Swing" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: spiral drawer" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select AngularMovementSpiralDrawer) ]
      [ Html.text "Spiral Drawer" ]
    ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "oscillations" ]
  [ Html.text "Oscillations" ]
, E.html <| Html.p []
  [ Html.text "Oscillation amplitude and period" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsSimpleHarmonicMotion) ]
      [ Html.text "Simple Harmonic Motion" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Rainbow slinky" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsRainbowSlinky) ]
      [ Html.text "Rainbow Slinky" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Oscillation with angular velocity" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsSimpleHarmonicMotionWithAngle) ]
      [ Html.text "Simple Harmonic Motion with Angle" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsOscillators) ]
      [ Html.text "Group of Oscillators" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Spaceship ride" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try it yourself!" ]
  ]
, E.html <| Html.p []
  [ Html.text "Waves" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsSineWave) ]
      [ Html.text "Sine Wave" ]
    ]
  , Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsStaticSineWave) ]
      [ Html.text "Static Sine Wave" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Many waves" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsManyWaves) ]
      [ Html.text "Many Waves" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Trig and forces: the pendulum" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.a [ Html.Events.onClick (Select OscillationsPendulum) ]
      [ Html.text "Simple Pendulum" ]
    ]
  ]
, E.html <| Html.p []
  [ Html.text "Challenge: Pendulum puppet" ]
, E.html <| Html.ul []
  [ Html.li []
    [ Html.text "Try it yourself! This one is very tricky." ]
  ]
, E.html <| Html.h1 [ Html.Attributes.id "licenses" ]
  [ Html.text "Licenses" ]
, E.html <| Html.p []
  [ Html.text "All code are made available under the following license: MIT license." ]
, E.html <| Html.p []
  [ Html.text "All non-code (such as writing, drawings, images, etc.) are also owned by their respective author and made  available  under the following license: Creative Commons Attribution License." ]
]
`.split("\n").join("\n" + " ".repeat(4 * 2));

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
import Html exposing (Html, ul, li, a)
import Html.Attributes
import Html.Events
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
        [ E.scrollbarY
        , E.width E.fill
        , E.htmlAttribute <| Html.Attributes.style "height" "calc(100vh - 25px)"
        , E.htmlAttribute <| Html.Attributes.style "white-space" "pre-wrap"
        , E.htmlAttribute <| Html.Attributes.style "word-break" "break-word"
        , E.htmlAttribute <| Html.Attributes.classList [ ("scrollable", True) ]
        ]
        `
    + demoSelections
    + `]
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
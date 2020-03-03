module Main exposing (main)

import Browser
import Color
import Element as E
import Element.Events exposing (onClick)
import Html exposing (Html)
import TypedSvg as Svg
import TypedSvg.Core
import TypedSvg.Attributes as SvgAttributes
import TypedSvg.Types as SvgTypes
import RandomWalks.Basic as RandomWalksBasic

import AngularMovement.AccelerateTowardsMouse as AngularMovementAccelerateTowardsMouse
import AngularMovement.AcceleratingBaton as AngularMovementAcceleratingBaton
import Forces.ArtworkGenerator as ForcesArtworkGenerator
import Forces.BlowingWind as ForcesBlowingWind
import AngularMovement.FallingBoulder as AngularMovementFallingBoulder
import Forces.BlowingWindWithGravity as ForcesBlowingWindWithGravity
import Noise.AnimatedBox as NoiseAnimatedBox
import AngularMovement.ManyOrbitsWithDynamicRotation as AngularMovementManyOrbitsWithDynamicRotation
import Forces.BlowingWindWithGravityAndFriction as ForcesBlowingWindWithGravityAndFriction
import Oscillations.ManyWaves as OscillationsManyWaves
import Noise.MountainRange as NoiseMountainRange
import AngularMovement.ManyOrbitsWithRotation as AngularMovementManyOrbitsWithRotation
import Forces.FloatingBalloon as ForcesFloatingBalloon
import Oscillations.Oscillators as OscillationsOscillators
import Noise.Perlin as NoisePerlin
import AngularMovement.PolarSwing as AngularMovementPolarSwing
import Forces.ManyBalls as ForcesManyBalls
import Oscillations.Pendulum as OscillationsPendulum
import Noise.PerlinBox as NoisePerlinBox
import RandomWalks.Directed as RandomWalksDirected
import AngularMovement.SpinningBaton as AngularMovementSpinningBaton
import Forces.ManyOrbits as ForcesManyOrbits
import Oscillations.RainbowSlinky as OscillationsRainbowSlinky
import Noise.PerlinStepWalker as NoisePerlinStepWalker
import RandomWalks.Gaussian as RandomWalksGaussian
import Vector.AccelerateTowardsMouse as VectorAccelerateTowardsMouse
import AngularMovement.SpiralDrawer as AngularMovementSpiralDrawer
import Forces.MutualAttraction as ForcesMutualAttraction
import Oscillations.SimpleHarmonicMotion as OscillationsSimpleHarmonicMotion
import Noise.PerlinWalker as NoisePerlinWalker
import RandomWalks.Improved as RandomWalksImproved
import Vector.BouncingBall as VectorBouncingBall
import Forces.MutualRepulsion as ForcesMutualRepulsion
import Oscillations.SimpleHarmonicMotionWithAngle as OscillationsSimpleHarmonicMotionWithAngle
import Noise.RandomBox as NoiseRandomBox
import RandomWalks.Levy as RandomWalksLevy
import Vector.BouncingBallWithVector as VectorBouncingBallWithVector
import Forces.Resistance as ForcesResistance
import Oscillations.SineWave as OscillationsSineWave
import RandomWalks.MonteCarlo as RandomWalksMonteCarlo
import Vector.BrakingCar as VectorBrakingCar
import Forces.SingleOrbit as ForcesSingleOrbit
import Oscillations.StaticSineWave as OscillationsStaticSineWave
import RandomWalks.NormalDistribution as RandomWalksNormalDistribution
import Vector.ConstantAcceleration as VectorConstantAcceleration
import Forces.SinkingLogs as ForcesSinkingLogs
import RandomWalks.PaintSplatter as RandomWalksPaintSplatter
import Vector.ConstantVelocity as VectorConstantVelocity
import Forces.WallBalls as ForcesWallBalls
import Vector.GroupAccelerateTowardsMouse as VectorGroupAccelerateTowardsMouse
import Vector.MouseStalker as VectorMouseStalker
import Vector.MouseTracing as VectorMouseTracing
import Vector.MouseTracingNormalized as VectorMouseTracingNormalized
import Vector.MouseTracingScaled as VectorMouseTracingScaled
import Vector.MouseTracingWithMagnitude as VectorMouseTracingWithMagnitude
import Vector.RandomAcceleration as VectorRandomAcceleration
import Vector.ScalingSaber as VectorScalingSaber
import Vector.WalkerWithVector as VectorWalkerWithVector


-- INIT


init : () -> ( Model, Cmd Msg )
init _ =
  let
    ( subModel, subCmd ) =
      RandomWalksBasic.init ()
  in
  ( RandomWalksBasicAnim subModel
  , subCmd
    |> Cmd.map BasicWalkerMsg
  )


-- MODEL


type Model
  = RandomWalksBasicAnim RandomWalksBasic.Model

  | AngularMovementAccelerateTowardsMouseAnim AngularMovementAccelerateTowardsMouse.Model
  | AngularMovementAcceleratingBatonAnim AngularMovementAcceleratingBaton.Model
  | ForcesArtworkGeneratorAnim ForcesArtworkGenerator.Model
  | ForcesBlowingWindAnim ForcesBlowingWind.Model
  | AngularMovementFallingBoulderAnim AngularMovementFallingBoulder.Model
  | ForcesBlowingWindWithGravityAnim ForcesBlowingWindWithGravity.Model
  | NoiseAnimatedBoxAnim NoiseAnimatedBox.Model
  | AngularMovementManyOrbitsWithDynamicRotationAnim AngularMovementManyOrbitsWithDynamicRotation.Model
  | ForcesBlowingWindWithGravityAndFrictionAnim ForcesBlowingWindWithGravityAndFriction.Model
  | OscillationsManyWavesAnim OscillationsManyWaves.Model
  | NoiseMountainRangeAnim NoiseMountainRange.Model
  | AngularMovementManyOrbitsWithRotationAnim AngularMovementManyOrbitsWithRotation.Model
  | ForcesFloatingBalloonAnim ForcesFloatingBalloon.Model
  | OscillationsOscillatorsAnim OscillationsOscillators.Model
  | NoisePerlinAnim NoisePerlin.Model
  | AngularMovementPolarSwingAnim AngularMovementPolarSwing.Model
  | ForcesManyBallsAnim ForcesManyBalls.Model
  | OscillationsPendulumAnim OscillationsPendulum.Model
  | NoisePerlinBoxAnim NoisePerlinBox.Model
  | RandomWalksDirectedAnim RandomWalksDirected.Model
  | AngularMovementSpinningBatonAnim AngularMovementSpinningBaton.Model
  | ForcesManyOrbitsAnim ForcesManyOrbits.Model
  | OscillationsRainbowSlinkyAnim OscillationsRainbowSlinky.Model
  | NoisePerlinStepWalkerAnim NoisePerlinStepWalker.Model
  | RandomWalksGaussianAnim RandomWalksGaussian.Model
  | VectorAccelerateTowardsMouseAnim VectorAccelerateTowardsMouse.Model
  | AngularMovementSpiralDrawerAnim AngularMovementSpiralDrawer.Model
  | ForcesMutualAttractionAnim ForcesMutualAttraction.Model
  | OscillationsSimpleHarmonicMotionAnim OscillationsSimpleHarmonicMotion.Model
  | NoisePerlinWalkerAnim NoisePerlinWalker.Model
  | RandomWalksImprovedAnim RandomWalksImproved.Model
  | VectorBouncingBallAnim VectorBouncingBall.Model
  | ForcesMutualRepulsionAnim ForcesMutualRepulsion.Model
  | OscillationsSimpleHarmonicMotionWithAngleAnim OscillationsSimpleHarmonicMotionWithAngle.Model
  | NoiseRandomBoxAnim NoiseRandomBox.Model
  | RandomWalksLevyAnim RandomWalksLevy.Model
  | VectorBouncingBallWithVectorAnim VectorBouncingBallWithVector.Model
  | ForcesResistanceAnim ForcesResistance.Model
  | OscillationsSineWaveAnim OscillationsSineWave.Model
  | RandomWalksMonteCarloAnim RandomWalksMonteCarlo.Model
  | VectorBrakingCarAnim VectorBrakingCar.Model
  | ForcesSingleOrbitAnim ForcesSingleOrbit.Model
  | OscillationsStaticSineWaveAnim OscillationsStaticSineWave.Model
  | RandomWalksNormalDistributionAnim RandomWalksNormalDistribution.Model
  | VectorConstantAccelerationAnim VectorConstantAcceleration.Model
  | ForcesSinkingLogsAnim ForcesSinkingLogs.Model
  | RandomWalksPaintSplatterAnim RandomWalksPaintSplatter.Model
  | VectorConstantVelocityAnim VectorConstantVelocity.Model
  | ForcesWallBallsAnim ForcesWallBalls.Model
  | VectorGroupAccelerateTowardsMouseAnim VectorGroupAccelerateTowardsMouse.Model
  | VectorMouseStalkerAnim VectorMouseStalker.Model
  | VectorMouseTracingAnim VectorMouseTracing.Model
  | VectorMouseTracingNormalizedAnim VectorMouseTracingNormalized.Model
  | VectorMouseTracingScaledAnim VectorMouseTracingScaled.Model
  | VectorMouseTracingWithMagnitudeAnim VectorMouseTracingWithMagnitude.Model
  | VectorRandomAccelerationAnim VectorRandomAcceleration.Model
  | VectorScalingSaberAnim VectorScalingSaber.Model
  | VectorWalkerWithVectorAnim VectorWalkerWithVector.Model

type Animation
  = RandomWalksBasic

  | AngularMovementAccelerateTowardsMouse
  | AngularMovementAcceleratingBaton
  | ForcesArtworkGenerator
  | ForcesBlowingWind
  | AngularMovementFallingBoulder
  | ForcesBlowingWindWithGravity
  | NoiseAnimatedBox
  | AngularMovementManyOrbitsWithDynamicRotation
  | ForcesBlowingWindWithGravityAndFriction
  | OscillationsManyWaves
  | NoiseMountainRange
  | AngularMovementManyOrbitsWithRotation
  | ForcesFloatingBalloon
  | OscillationsOscillators
  | NoisePerlin
  | AngularMovementPolarSwing
  | ForcesManyBalls
  | OscillationsPendulum
  | NoisePerlinBox
  | RandomWalksDirected
  | AngularMovementSpinningBaton
  | ForcesManyOrbits
  | OscillationsRainbowSlinky
  | NoisePerlinStepWalker
  | RandomWalksGaussian
  | VectorAccelerateTowardsMouse
  | AngularMovementSpiralDrawer
  | ForcesMutualAttraction
  | OscillationsSimpleHarmonicMotion
  | NoisePerlinWalker
  | RandomWalksImproved
  | VectorBouncingBall
  | ForcesMutualRepulsion
  | OscillationsSimpleHarmonicMotionWithAngle
  | NoiseRandomBox
  | RandomWalksLevy
  | VectorBouncingBallWithVector
  | ForcesResistance
  | OscillationsSineWave
  | RandomWalksMonteCarlo
  | VectorBrakingCar
  | ForcesSingleOrbit
  | OscillationsStaticSineWave
  | RandomWalksNormalDistribution
  | VectorConstantAcceleration
  | ForcesSinkingLogs
  | RandomWalksPaintSplatter
  | VectorConstantVelocity
  | ForcesWallBalls
  | VectorGroupAccelerateTowardsMouse
  | VectorMouseStalker
  | VectorMouseTracing
  | VectorMouseTracingNormalized
  | VectorMouseTracingScaled
  | VectorMouseTracingWithMagnitude
  | VectorRandomAcceleration
  | VectorScalingSaber
  | VectorWalkerWithVector

-- UPDATE


type Msg
  = Select Animation
  | BasicWalkerMsg RandomWalksBasic.Msg
  | AngularMovementAccelerateTowardsMouseMsg AngularMovementAccelerateTowardsMouse.Msg
  | AngularMovementAcceleratingBatonMsg AngularMovementAcceleratingBaton.Msg
  | ForcesArtworkGeneratorMsg ForcesArtworkGenerator.Msg
  | ForcesBlowingWindMsg ForcesBlowingWind.Msg
  | AngularMovementFallingBoulderMsg AngularMovementFallingBoulder.Msg
  | ForcesBlowingWindWithGravityMsg ForcesBlowingWindWithGravity.Msg
  | NoiseAnimatedBoxMsg NoiseAnimatedBox.Msg
  | AngularMovementManyOrbitsWithDynamicRotationMsg AngularMovementManyOrbitsWithDynamicRotation.Msg
  | ForcesBlowingWindWithGravityAndFrictionMsg ForcesBlowingWindWithGravityAndFriction.Msg
  | OscillationsManyWavesMsg OscillationsManyWaves.Msg
  | NoiseMountainRangeMsg NoiseMountainRange.Msg
  | AngularMovementManyOrbitsWithRotationMsg AngularMovementManyOrbitsWithRotation.Msg
  | ForcesFloatingBalloonMsg ForcesFloatingBalloon.Msg
  | OscillationsOscillatorsMsg OscillationsOscillators.Msg
  | NoisePerlinMsg NoisePerlin.Msg
  | AngularMovementPolarSwingMsg AngularMovementPolarSwing.Msg
  | ForcesManyBallsMsg ForcesManyBalls.Msg
  | OscillationsPendulumMsg OscillationsPendulum.Msg
  | NoisePerlinBoxMsg NoisePerlinBox.Msg
  | RandomWalksDirectedMsg RandomWalksDirected.Msg
  | AngularMovementSpinningBatonMsg AngularMovementSpinningBaton.Msg
  | ForcesManyOrbitsMsg ForcesManyOrbits.Msg
  | OscillationsRainbowSlinkyMsg OscillationsRainbowSlinky.Msg
  | NoisePerlinStepWalkerMsg NoisePerlinStepWalker.Msg
  | RandomWalksGaussianMsg RandomWalksGaussian.Msg
  | VectorAccelerateTowardsMouseMsg VectorAccelerateTowardsMouse.Msg
  | AngularMovementSpiralDrawerMsg AngularMovementSpiralDrawer.Msg
  | ForcesMutualAttractionMsg ForcesMutualAttraction.Msg
  | OscillationsSimpleHarmonicMotionMsg OscillationsSimpleHarmonicMotion.Msg
  | NoisePerlinWalkerMsg NoisePerlinWalker.Msg
  | RandomWalksImprovedMsg RandomWalksImproved.Msg
  | VectorBouncingBallMsg VectorBouncingBall.Msg
  | ForcesMutualRepulsionMsg ForcesMutualRepulsion.Msg
  | OscillationsSimpleHarmonicMotionWithAngleMsg OscillationsSimpleHarmonicMotionWithAngle.Msg
  | NoiseRandomBoxMsg NoiseRandomBox.Msg
  | RandomWalksLevyMsg RandomWalksLevy.Msg
  | VectorBouncingBallWithVectorMsg VectorBouncingBallWithVector.Msg
  | ForcesResistanceMsg ForcesResistance.Msg
  | OscillationsSineWaveMsg OscillationsSineWave.Msg
  | RandomWalksMonteCarloMsg RandomWalksMonteCarlo.Msg
  | VectorBrakingCarMsg VectorBrakingCar.Msg
  | ForcesSingleOrbitMsg ForcesSingleOrbit.Msg
  | OscillationsStaticSineWaveMsg OscillationsStaticSineWave.Msg
  | RandomWalksNormalDistributionMsg RandomWalksNormalDistribution.Msg
  | VectorConstantAccelerationMsg VectorConstantAcceleration.Msg
  | ForcesSinkingLogsMsg ForcesSinkingLogs.Msg
  | RandomWalksPaintSplatterMsg RandomWalksPaintSplatter.Msg
  | VectorConstantVelocityMsg VectorConstantVelocity.Msg
  | ForcesWallBallsMsg ForcesWallBalls.Msg
  | VectorGroupAccelerateTowardsMouseMsg VectorGroupAccelerateTowardsMouse.Msg
  | VectorMouseStalkerMsg VectorMouseStalker.Msg
  | VectorMouseTracingMsg VectorMouseTracing.Msg
  | VectorMouseTracingNormalizedMsg VectorMouseTracingNormalized.Msg
  | VectorMouseTracingScaledMsg VectorMouseTracingScaled.Msg
  | VectorMouseTracingWithMagnitudeMsg VectorMouseTracingWithMagnitude.Msg
  | VectorRandomAccelerationMsg VectorRandomAcceleration.Msg
  | VectorScalingSaberMsg VectorScalingSaber.Msg
  | VectorWalkerWithVectorMsg VectorWalkerWithVector.Msg

update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
  case ( msg, model ) of
    ( Select anim, _ ) ->
      case anim of
        RandomWalksBasic ->
          let
            ( subModel, subCmd ) =
              RandomWalksBasic.init ()
          in
          ( RandomWalksBasicAnim subModel
          , subCmd
            |> Cmd.map BasicWalkerMsg
          )

        AngularMovementAccelerateTowardsMouse ->
          let
            ( subModel, subCmd ) =
              AngularMovementAccelerateTowardsMouse.init ()
          in
          ( AngularMovementAccelerateTowardsMouseAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementAccelerateTowardsMouseMsg
          )
        
        AngularMovementAcceleratingBaton ->
          let
            ( subModel, subCmd ) =
              AngularMovementAcceleratingBaton.init ()
          in
          ( AngularMovementAcceleratingBatonAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementAcceleratingBatonMsg
          )
        
        ForcesArtworkGenerator ->
          let
            ( subModel, subCmd ) =
              ForcesArtworkGenerator.init ()
          in
          ( ForcesArtworkGeneratorAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesArtworkGeneratorMsg
          )
        
        ForcesBlowingWind ->
          let
            ( subModel, subCmd ) =
              ForcesBlowingWind.init ()
          in
          ( ForcesBlowingWindAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesBlowingWindMsg
          )
        
        AngularMovementFallingBoulder ->
          let
            ( subModel, subCmd ) =
              AngularMovementFallingBoulder.init ()
          in
          ( AngularMovementFallingBoulderAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementFallingBoulderMsg
          )
        
        ForcesBlowingWindWithGravity ->
          let
            ( subModel, subCmd ) =
              ForcesBlowingWindWithGravity.init ()
          in
          ( ForcesBlowingWindWithGravityAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesBlowingWindWithGravityMsg
          )
        
        NoiseAnimatedBox ->
          let
            ( subModel, subCmd ) =
              NoiseAnimatedBox.init ()
          in
          ( NoiseAnimatedBoxAnim <|
            subModel
          , subCmd
            |> Cmd.map NoiseAnimatedBoxMsg
          )
        
        AngularMovementManyOrbitsWithDynamicRotation ->
          let
            ( subModel, subCmd ) =
              AngularMovementManyOrbitsWithDynamicRotation.init ()
          in
          ( AngularMovementManyOrbitsWithDynamicRotationAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementManyOrbitsWithDynamicRotationMsg
          )
        
        ForcesBlowingWindWithGravityAndFriction ->
          let
            ( subModel, subCmd ) =
              ForcesBlowingWindWithGravityAndFriction.init ()
          in
          ( ForcesBlowingWindWithGravityAndFrictionAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesBlowingWindWithGravityAndFrictionMsg
          )
        
        OscillationsManyWaves ->
          let
            ( subModel, subCmd ) =
              OscillationsManyWaves.init ()
          in
          ( OscillationsManyWavesAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsManyWavesMsg
          )
        
        NoiseMountainRange ->
          let
            ( subModel, subCmd ) =
              NoiseMountainRange.init ()
          in
          ( NoiseMountainRangeAnim <|
            subModel
          , subCmd
            |> Cmd.map NoiseMountainRangeMsg
          )
        
        AngularMovementManyOrbitsWithRotation ->
          let
            ( subModel, subCmd ) =
              AngularMovementManyOrbitsWithRotation.init ()
          in
          ( AngularMovementManyOrbitsWithRotationAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementManyOrbitsWithRotationMsg
          )
        
        ForcesFloatingBalloon ->
          let
            ( subModel, subCmd ) =
              ForcesFloatingBalloon.init ()
          in
          ( ForcesFloatingBalloonAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesFloatingBalloonMsg
          )
        
        OscillationsOscillators ->
          let
            ( subModel, subCmd ) =
              OscillationsOscillators.init ()
          in
          ( OscillationsOscillatorsAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsOscillatorsMsg
          )
        
        NoisePerlin ->
          let
            ( subModel, subCmd ) =
              NoisePerlin.init ()
          in
          ( NoisePerlinAnim <|
            subModel
          , subCmd
            |> Cmd.map NoisePerlinMsg
          )
        
        AngularMovementPolarSwing ->
          let
            ( subModel, subCmd ) =
              AngularMovementPolarSwing.init ()
          in
          ( AngularMovementPolarSwingAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementPolarSwingMsg
          )
        
        ForcesManyBalls ->
          let
            ( subModel, subCmd ) =
              ForcesManyBalls.init ()
          in
          ( ForcesManyBallsAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesManyBallsMsg
          )
        
        OscillationsPendulum ->
          let
            ( subModel, subCmd ) =
              OscillationsPendulum.init ()
          in
          ( OscillationsPendulumAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsPendulumMsg
          )
        
        NoisePerlinBox ->
          let
            ( subModel, subCmd ) =
              NoisePerlinBox.init ()
          in
          ( NoisePerlinBoxAnim <|
            subModel
          , subCmd
            |> Cmd.map NoisePerlinBoxMsg
          )
        
        RandomWalksDirected ->
          let
            ( subModel, subCmd ) =
              RandomWalksDirected.init ()
          in
          ( RandomWalksDirectedAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksDirectedMsg
          )
        
        AngularMovementSpinningBaton ->
          let
            ( subModel, subCmd ) =
              AngularMovementSpinningBaton.init ()
          in
          ( AngularMovementSpinningBatonAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementSpinningBatonMsg
          )
        
        ForcesManyOrbits ->
          let
            ( subModel, subCmd ) =
              ForcesManyOrbits.init ()
          in
          ( ForcesManyOrbitsAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesManyOrbitsMsg
          )
        
        OscillationsRainbowSlinky ->
          let
            ( subModel, subCmd ) =
              OscillationsRainbowSlinky.init ()
          in
          ( OscillationsRainbowSlinkyAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsRainbowSlinkyMsg
          )
        
        NoisePerlinStepWalker ->
          let
            ( subModel, subCmd ) =
              NoisePerlinStepWalker.init ()
          in
          ( NoisePerlinStepWalkerAnim <|
            subModel
          , subCmd
            |> Cmd.map NoisePerlinStepWalkerMsg
          )
        
        RandomWalksGaussian ->
          let
            ( subModel, subCmd ) =
              RandomWalksGaussian.init ()
          in
          ( RandomWalksGaussianAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksGaussianMsg
          )
        
        VectorAccelerateTowardsMouse ->
          let
            ( subModel, subCmd ) =
              VectorAccelerateTowardsMouse.init ()
          in
          ( VectorAccelerateTowardsMouseAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorAccelerateTowardsMouseMsg
          )
        
        AngularMovementSpiralDrawer ->
          let
            ( subModel, subCmd ) =
              AngularMovementSpiralDrawer.init ()
          in
          ( AngularMovementSpiralDrawerAnim <|
            subModel
          , subCmd
            |> Cmd.map AngularMovementSpiralDrawerMsg
          )
        
        ForcesMutualAttraction ->
          let
            ( subModel, subCmd ) =
              ForcesMutualAttraction.init ()
          in
          ( ForcesMutualAttractionAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesMutualAttractionMsg
          )
        
        OscillationsSimpleHarmonicMotion ->
          let
            ( subModel, subCmd ) =
              OscillationsSimpleHarmonicMotion.init ()
          in
          ( OscillationsSimpleHarmonicMotionAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsSimpleHarmonicMotionMsg
          )
        
        NoisePerlinWalker ->
          let
            ( subModel, subCmd ) =
              NoisePerlinWalker.init ()
          in
          ( NoisePerlinWalkerAnim <|
            subModel
          , subCmd
            |> Cmd.map NoisePerlinWalkerMsg
          )
        
        RandomWalksImproved ->
          let
            ( subModel, subCmd ) =
              RandomWalksImproved.init ()
          in
          ( RandomWalksImprovedAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksImprovedMsg
          )
        
        VectorBouncingBall ->
          let
            ( subModel, subCmd ) =
              VectorBouncingBall.init ()
          in
          ( VectorBouncingBallAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorBouncingBallMsg
          )
        
        ForcesMutualRepulsion ->
          let
            ( subModel, subCmd ) =
              ForcesMutualRepulsion.init ()
          in
          ( ForcesMutualRepulsionAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesMutualRepulsionMsg
          )
        
        OscillationsSimpleHarmonicMotionWithAngle ->
          let
            ( subModel, subCmd ) =
              OscillationsSimpleHarmonicMotionWithAngle.init ()
          in
          ( OscillationsSimpleHarmonicMotionWithAngleAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsSimpleHarmonicMotionWithAngleMsg
          )
        
        NoiseRandomBox ->
          let
            ( subModel, subCmd ) =
              NoiseRandomBox.init ()
          in
          ( NoiseRandomBoxAnim <|
            subModel
          , subCmd
            |> Cmd.map NoiseRandomBoxMsg
          )
        
        RandomWalksLevy ->
          let
            ( subModel, subCmd ) =
              RandomWalksLevy.init ()
          in
          ( RandomWalksLevyAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksLevyMsg
          )
        
        VectorBouncingBallWithVector ->
          let
            ( subModel, subCmd ) =
              VectorBouncingBallWithVector.init ()
          in
          ( VectorBouncingBallWithVectorAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorBouncingBallWithVectorMsg
          )
        
        ForcesResistance ->
          let
            ( subModel, subCmd ) =
              ForcesResistance.init ()
          in
          ( ForcesResistanceAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesResistanceMsg
          )
        
        OscillationsSineWave ->
          let
            ( subModel, subCmd ) =
              OscillationsSineWave.init ()
          in
          ( OscillationsSineWaveAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsSineWaveMsg
          )
        
        RandomWalksMonteCarlo ->
          let
            ( subModel, subCmd ) =
              RandomWalksMonteCarlo.init ()
          in
          ( RandomWalksMonteCarloAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksMonteCarloMsg
          )
        
        VectorBrakingCar ->
          let
            ( subModel, subCmd ) =
              VectorBrakingCar.init ()
          in
          ( VectorBrakingCarAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorBrakingCarMsg
          )
        
        ForcesSingleOrbit ->
          let
            ( subModel, subCmd ) =
              ForcesSingleOrbit.init ()
          in
          ( ForcesSingleOrbitAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesSingleOrbitMsg
          )
        
        OscillationsStaticSineWave ->
          let
            ( subModel, subCmd ) =
              OscillationsStaticSineWave.init ()
          in
          ( OscillationsStaticSineWaveAnim <|
            subModel
          , subCmd
            |> Cmd.map OscillationsStaticSineWaveMsg
          )
        
        RandomWalksNormalDistribution ->
          let
            ( subModel, subCmd ) =
              RandomWalksNormalDistribution.init ()
          in
          ( RandomWalksNormalDistributionAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksNormalDistributionMsg
          )
        
        VectorConstantAcceleration ->
          let
            ( subModel, subCmd ) =
              VectorConstantAcceleration.init ()
          in
          ( VectorConstantAccelerationAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorConstantAccelerationMsg
          )
        
        ForcesSinkingLogs ->
          let
            ( subModel, subCmd ) =
              ForcesSinkingLogs.init ()
          in
          ( ForcesSinkingLogsAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesSinkingLogsMsg
          )
        
        RandomWalksPaintSplatter ->
          let
            ( subModel, subCmd ) =
              RandomWalksPaintSplatter.init ()
          in
          ( RandomWalksPaintSplatterAnim <|
            subModel
          , subCmd
            |> Cmd.map RandomWalksPaintSplatterMsg
          )
        
        VectorConstantVelocity ->
          let
            ( subModel, subCmd ) =
              VectorConstantVelocity.init ()
          in
          ( VectorConstantVelocityAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorConstantVelocityMsg
          )
        
        ForcesWallBalls ->
          let
            ( subModel, subCmd ) =
              ForcesWallBalls.init ()
          in
          ( ForcesWallBallsAnim <|
            subModel
          , subCmd
            |> Cmd.map ForcesWallBallsMsg
          )
        
        VectorGroupAccelerateTowardsMouse ->
          let
            ( subModel, subCmd ) =
              VectorGroupAccelerateTowardsMouse.init ()
          in
          ( VectorGroupAccelerateTowardsMouseAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorGroupAccelerateTowardsMouseMsg
          )
        
        VectorMouseStalker ->
          let
            ( subModel, subCmd ) =
              VectorMouseStalker.init ()
          in
          ( VectorMouseStalkerAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorMouseStalkerMsg
          )
        
        VectorMouseTracing ->
          let
            ( subModel, subCmd ) =
              VectorMouseTracing.init ()
          in
          ( VectorMouseTracingAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorMouseTracingMsg
          )
        
        VectorMouseTracingNormalized ->
          let
            ( subModel, subCmd ) =
              VectorMouseTracingNormalized.init ()
          in
          ( VectorMouseTracingNormalizedAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorMouseTracingNormalizedMsg
          )
        
        VectorMouseTracingScaled ->
          let
            ( subModel, subCmd ) =
              VectorMouseTracingScaled.init ()
          in
          ( VectorMouseTracingScaledAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorMouseTracingScaledMsg
          )
        
        VectorMouseTracingWithMagnitude ->
          let
            ( subModel, subCmd ) =
              VectorMouseTracingWithMagnitude.init ()
          in
          ( VectorMouseTracingWithMagnitudeAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorMouseTracingWithMagnitudeMsg
          )
        
        VectorRandomAcceleration ->
          let
            ( subModel, subCmd ) =
              VectorRandomAcceleration.init ()
          in
          ( VectorRandomAccelerationAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorRandomAccelerationMsg
          )
        
        VectorScalingSaber ->
          let
            ( subModel, subCmd ) =
              VectorScalingSaber.init ()
          in
          ( VectorScalingSaberAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorScalingSaberMsg
          )
        
        VectorWalkerWithVector ->
          let
            ( subModel, subCmd ) =
              VectorWalkerWithVector.init ()
          in
          ( VectorWalkerWithVectorAnim <|
            subModel
          , subCmd
            |> Cmd.map VectorWalkerWithVectorMsg
          )
        
    ( BasicWalkerMsg subMsg, RandomWalksBasicAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksBasic.update subMsg
      in
      ( RandomWalksBasicAnim newSubModel
      , subCmd
        |> Cmd.map BasicWalkerMsg
      )

    ( AngularMovementAccelerateTowardsMouseMsg subMsg, AngularMovementAccelerateTowardsMouseAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementAccelerateTowardsMouse.update subMsg
      in
      ( AngularMovementAccelerateTowardsMouseAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementAccelerateTowardsMouseMsg
      )
    
    ( AngularMovementAcceleratingBatonMsg subMsg, AngularMovementAcceleratingBatonAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementAcceleratingBaton.update subMsg
      in
      ( AngularMovementAcceleratingBatonAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementAcceleratingBatonMsg
      )
    
    ( ForcesArtworkGeneratorMsg subMsg, ForcesArtworkGeneratorAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesArtworkGenerator.update subMsg
      in
      ( ForcesArtworkGeneratorAnim newSubModel
      , subCmd
        |> Cmd.map ForcesArtworkGeneratorMsg
      )
    
    ( ForcesBlowingWindMsg subMsg, ForcesBlowingWindAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesBlowingWind.update subMsg
      in
      ( ForcesBlowingWindAnim newSubModel
      , subCmd
        |> Cmd.map ForcesBlowingWindMsg
      )
    
    ( AngularMovementFallingBoulderMsg subMsg, AngularMovementFallingBoulderAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementFallingBoulder.update subMsg
      in
      ( AngularMovementFallingBoulderAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementFallingBoulderMsg
      )
    
    ( ForcesBlowingWindWithGravityMsg subMsg, ForcesBlowingWindWithGravityAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesBlowingWindWithGravity.update subMsg
      in
      ( ForcesBlowingWindWithGravityAnim newSubModel
      , subCmd
        |> Cmd.map ForcesBlowingWindWithGravityMsg
      )
    
    ( NoiseAnimatedBoxMsg subMsg, NoiseAnimatedBoxAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoiseAnimatedBox.update subMsg
      in
      ( NoiseAnimatedBoxAnim newSubModel
      , subCmd
        |> Cmd.map NoiseAnimatedBoxMsg
      )
    
    ( AngularMovementManyOrbitsWithDynamicRotationMsg subMsg, AngularMovementManyOrbitsWithDynamicRotationAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementManyOrbitsWithDynamicRotation.update subMsg
      in
      ( AngularMovementManyOrbitsWithDynamicRotationAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementManyOrbitsWithDynamicRotationMsg
      )
    
    ( ForcesBlowingWindWithGravityAndFrictionMsg subMsg, ForcesBlowingWindWithGravityAndFrictionAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesBlowingWindWithGravityAndFriction.update subMsg
      in
      ( ForcesBlowingWindWithGravityAndFrictionAnim newSubModel
      , subCmd
        |> Cmd.map ForcesBlowingWindWithGravityAndFrictionMsg
      )
    
    ( OscillationsManyWavesMsg subMsg, OscillationsManyWavesAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsManyWaves.update subMsg
      in
      ( OscillationsManyWavesAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsManyWavesMsg
      )
    
    ( NoiseMountainRangeMsg subMsg, NoiseMountainRangeAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoiseMountainRange.update subMsg
      in
      ( NoiseMountainRangeAnim newSubModel
      , subCmd
        |> Cmd.map NoiseMountainRangeMsg
      )
    
    ( AngularMovementManyOrbitsWithRotationMsg subMsg, AngularMovementManyOrbitsWithRotationAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementManyOrbitsWithRotation.update subMsg
      in
      ( AngularMovementManyOrbitsWithRotationAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementManyOrbitsWithRotationMsg
      )
    
    ( ForcesFloatingBalloonMsg subMsg, ForcesFloatingBalloonAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesFloatingBalloon.update subMsg
      in
      ( ForcesFloatingBalloonAnim newSubModel
      , subCmd
        |> Cmd.map ForcesFloatingBalloonMsg
      )
    
    ( OscillationsOscillatorsMsg subMsg, OscillationsOscillatorsAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsOscillators.update subMsg
      in
      ( OscillationsOscillatorsAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsOscillatorsMsg
      )
    
    ( NoisePerlinMsg subMsg, NoisePerlinAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoisePerlin.update subMsg
      in
      ( NoisePerlinAnim newSubModel
      , subCmd
        |> Cmd.map NoisePerlinMsg
      )
    
    ( AngularMovementPolarSwingMsg subMsg, AngularMovementPolarSwingAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementPolarSwing.update subMsg
      in
      ( AngularMovementPolarSwingAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementPolarSwingMsg
      )
    
    ( ForcesManyBallsMsg subMsg, ForcesManyBallsAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesManyBalls.update subMsg
      in
      ( ForcesManyBallsAnim newSubModel
      , subCmd
        |> Cmd.map ForcesManyBallsMsg
      )
    
    ( OscillationsPendulumMsg subMsg, OscillationsPendulumAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsPendulum.update subMsg
      in
      ( OscillationsPendulumAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsPendulumMsg
      )
    
    ( NoisePerlinBoxMsg subMsg, NoisePerlinBoxAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoisePerlinBox.update subMsg
      in
      ( NoisePerlinBoxAnim newSubModel
      , subCmd
        |> Cmd.map NoisePerlinBoxMsg
      )
    
    ( RandomWalksDirectedMsg subMsg, RandomWalksDirectedAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksDirected.update subMsg
      in
      ( RandomWalksDirectedAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksDirectedMsg
      )
    
    ( AngularMovementSpinningBatonMsg subMsg, AngularMovementSpinningBatonAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementSpinningBaton.update subMsg
      in
      ( AngularMovementSpinningBatonAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementSpinningBatonMsg
      )
    
    ( ForcesManyOrbitsMsg subMsg, ForcesManyOrbitsAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesManyOrbits.update subMsg
      in
      ( ForcesManyOrbitsAnim newSubModel
      , subCmd
        |> Cmd.map ForcesManyOrbitsMsg
      )
    
    ( OscillationsRainbowSlinkyMsg subMsg, OscillationsRainbowSlinkyAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsRainbowSlinky.update subMsg
      in
      ( OscillationsRainbowSlinkyAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsRainbowSlinkyMsg
      )
    
    ( NoisePerlinStepWalkerMsg subMsg, NoisePerlinStepWalkerAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoisePerlinStepWalker.update subMsg
      in
      ( NoisePerlinStepWalkerAnim newSubModel
      , subCmd
        |> Cmd.map NoisePerlinStepWalkerMsg
      )
    
    ( RandomWalksGaussianMsg subMsg, RandomWalksGaussianAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksGaussian.update subMsg
      in
      ( RandomWalksGaussianAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksGaussianMsg
      )
    
    ( VectorAccelerateTowardsMouseMsg subMsg, VectorAccelerateTowardsMouseAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorAccelerateTowardsMouse.update subMsg
      in
      ( VectorAccelerateTowardsMouseAnim newSubModel
      , subCmd
        |> Cmd.map VectorAccelerateTowardsMouseMsg
      )
    
    ( AngularMovementSpiralDrawerMsg subMsg, AngularMovementSpiralDrawerAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> AngularMovementSpiralDrawer.update subMsg
      in
      ( AngularMovementSpiralDrawerAnim newSubModel
      , subCmd
        |> Cmd.map AngularMovementSpiralDrawerMsg
      )
    
    ( ForcesMutualAttractionMsg subMsg, ForcesMutualAttractionAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesMutualAttraction.update subMsg
      in
      ( ForcesMutualAttractionAnim newSubModel
      , subCmd
        |> Cmd.map ForcesMutualAttractionMsg
      )
    
    ( OscillationsSimpleHarmonicMotionMsg subMsg, OscillationsSimpleHarmonicMotionAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsSimpleHarmonicMotion.update subMsg
      in
      ( OscillationsSimpleHarmonicMotionAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsSimpleHarmonicMotionMsg
      )
    
    ( NoisePerlinWalkerMsg subMsg, NoisePerlinWalkerAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoisePerlinWalker.update subMsg
      in
      ( NoisePerlinWalkerAnim newSubModel
      , subCmd
        |> Cmd.map NoisePerlinWalkerMsg
      )
    
    ( RandomWalksImprovedMsg subMsg, RandomWalksImprovedAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksImproved.update subMsg
      in
      ( RandomWalksImprovedAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksImprovedMsg
      )
    
    ( VectorBouncingBallMsg subMsg, VectorBouncingBallAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorBouncingBall.update subMsg
      in
      ( VectorBouncingBallAnim newSubModel
      , subCmd
        |> Cmd.map VectorBouncingBallMsg
      )
    
    ( ForcesMutualRepulsionMsg subMsg, ForcesMutualRepulsionAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesMutualRepulsion.update subMsg
      in
      ( ForcesMutualRepulsionAnim newSubModel
      , subCmd
        |> Cmd.map ForcesMutualRepulsionMsg
      )
    
    ( OscillationsSimpleHarmonicMotionWithAngleMsg subMsg, OscillationsSimpleHarmonicMotionWithAngleAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsSimpleHarmonicMotionWithAngle.update subMsg
      in
      ( OscillationsSimpleHarmonicMotionWithAngleAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsSimpleHarmonicMotionWithAngleMsg
      )
    
    ( NoiseRandomBoxMsg subMsg, NoiseRandomBoxAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> NoiseRandomBox.update subMsg
      in
      ( NoiseRandomBoxAnim newSubModel
      , subCmd
        |> Cmd.map NoiseRandomBoxMsg
      )
    
    ( RandomWalksLevyMsg subMsg, RandomWalksLevyAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksLevy.update subMsg
      in
      ( RandomWalksLevyAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksLevyMsg
      )
    
    ( VectorBouncingBallWithVectorMsg subMsg, VectorBouncingBallWithVectorAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorBouncingBallWithVector.update subMsg
      in
      ( VectorBouncingBallWithVectorAnim newSubModel
      , subCmd
        |> Cmd.map VectorBouncingBallWithVectorMsg
      )
    
    ( ForcesResistanceMsg subMsg, ForcesResistanceAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesResistance.update subMsg
      in
      ( ForcesResistanceAnim newSubModel
      , subCmd
        |> Cmd.map ForcesResistanceMsg
      )
    
    ( OscillationsSineWaveMsg subMsg, OscillationsSineWaveAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsSineWave.update subMsg
      in
      ( OscillationsSineWaveAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsSineWaveMsg
      )
    
    ( RandomWalksMonteCarloMsg subMsg, RandomWalksMonteCarloAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksMonteCarlo.update subMsg
      in
      ( RandomWalksMonteCarloAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksMonteCarloMsg
      )
    
    ( VectorBrakingCarMsg subMsg, VectorBrakingCarAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorBrakingCar.update subMsg
      in
      ( VectorBrakingCarAnim newSubModel
      , subCmd
        |> Cmd.map VectorBrakingCarMsg
      )
    
    ( ForcesSingleOrbitMsg subMsg, ForcesSingleOrbitAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesSingleOrbit.update subMsg
      in
      ( ForcesSingleOrbitAnim newSubModel
      , subCmd
        |> Cmd.map ForcesSingleOrbitMsg
      )
    
    ( OscillationsStaticSineWaveMsg subMsg, OscillationsStaticSineWaveAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> OscillationsStaticSineWave.update subMsg
      in
      ( OscillationsStaticSineWaveAnim newSubModel
      , subCmd
        |> Cmd.map OscillationsStaticSineWaveMsg
      )
    
    ( RandomWalksNormalDistributionMsg subMsg, RandomWalksNormalDistributionAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksNormalDistribution.update subMsg
      in
      ( RandomWalksNormalDistributionAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksNormalDistributionMsg
      )
    
    ( VectorConstantAccelerationMsg subMsg, VectorConstantAccelerationAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorConstantAcceleration.update subMsg
      in
      ( VectorConstantAccelerationAnim newSubModel
      , subCmd
        |> Cmd.map VectorConstantAccelerationMsg
      )
    
    ( ForcesSinkingLogsMsg subMsg, ForcesSinkingLogsAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesSinkingLogs.update subMsg
      in
      ( ForcesSinkingLogsAnim newSubModel
      , subCmd
        |> Cmd.map ForcesSinkingLogsMsg
      )
    
    ( RandomWalksPaintSplatterMsg subMsg, RandomWalksPaintSplatterAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> RandomWalksPaintSplatter.update subMsg
      in
      ( RandomWalksPaintSplatterAnim newSubModel
      , subCmd
        |> Cmd.map RandomWalksPaintSplatterMsg
      )
    
    ( VectorConstantVelocityMsg subMsg, VectorConstantVelocityAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorConstantVelocity.update subMsg
      in
      ( VectorConstantVelocityAnim newSubModel
      , subCmd
        |> Cmd.map VectorConstantVelocityMsg
      )
    
    ( ForcesWallBallsMsg subMsg, ForcesWallBallsAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> ForcesWallBalls.update subMsg
      in
      ( ForcesWallBallsAnim newSubModel
      , subCmd
        |> Cmd.map ForcesWallBallsMsg
      )
    
    ( VectorGroupAccelerateTowardsMouseMsg subMsg, VectorGroupAccelerateTowardsMouseAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorGroupAccelerateTowardsMouse.update subMsg
      in
      ( VectorGroupAccelerateTowardsMouseAnim newSubModel
      , subCmd
        |> Cmd.map VectorGroupAccelerateTowardsMouseMsg
      )
    
    ( VectorMouseStalkerMsg subMsg, VectorMouseStalkerAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorMouseStalker.update subMsg
      in
      ( VectorMouseStalkerAnim newSubModel
      , subCmd
        |> Cmd.map VectorMouseStalkerMsg
      )
    
    ( VectorMouseTracingMsg subMsg, VectorMouseTracingAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorMouseTracing.update subMsg
      in
      ( VectorMouseTracingAnim newSubModel
      , subCmd
        |> Cmd.map VectorMouseTracingMsg
      )
    
    ( VectorMouseTracingNormalizedMsg subMsg, VectorMouseTracingNormalizedAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorMouseTracingNormalized.update subMsg
      in
      ( VectorMouseTracingNormalizedAnim newSubModel
      , subCmd
        |> Cmd.map VectorMouseTracingNormalizedMsg
      )
    
    ( VectorMouseTracingScaledMsg subMsg, VectorMouseTracingScaledAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorMouseTracingScaled.update subMsg
      in
      ( VectorMouseTracingScaledAnim newSubModel
      , subCmd
        |> Cmd.map VectorMouseTracingScaledMsg
      )
    
    ( VectorMouseTracingWithMagnitudeMsg subMsg, VectorMouseTracingWithMagnitudeAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorMouseTracingWithMagnitude.update subMsg
      in
      ( VectorMouseTracingWithMagnitudeAnim newSubModel
      , subCmd
        |> Cmd.map VectorMouseTracingWithMagnitudeMsg
      )
    
    ( VectorRandomAccelerationMsg subMsg, VectorRandomAccelerationAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorRandomAcceleration.update subMsg
      in
      ( VectorRandomAccelerationAnim newSubModel
      , subCmd
        |> Cmd.map VectorRandomAccelerationMsg
      )
    
    ( VectorScalingSaberMsg subMsg, VectorScalingSaberAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorScalingSaber.update subMsg
      in
      ( VectorScalingSaberAnim newSubModel
      , subCmd
        |> Cmd.map VectorScalingSaberMsg
      )
    
    ( VectorWalkerWithVectorMsg subMsg, VectorWalkerWithVectorAnim subModel ) ->
      let
        ( newSubModel, subCmd ) =
          subModel
            |> VectorWalkerWithVector.update subMsg
      in
      ( VectorWalkerWithVectorAnim newSubModel
      , subCmd
        |> Cmd.map VectorWalkerWithVectorMsg
      )
    
    ( _, _ ) ->
      ( model, Cmd.none )


-- SUBSCRIPTIONS


subscriptions : Model -> Sub Msg
subscriptions anim =
  case anim of
    RandomWalksBasicAnim subModel ->
      RandomWalksBasic.subscriptions subModel
        |> Sub.map BasicWalkerMsg

    AngularMovementAccelerateTowardsMouseAnim subModel ->
      AngularMovementAccelerateTowardsMouse.subscriptions subModel
        |> Sub.map AngularMovementAccelerateTowardsMouseMsg
    
    AngularMovementAcceleratingBatonAnim subModel ->
      AngularMovementAcceleratingBaton.subscriptions subModel
        |> Sub.map AngularMovementAcceleratingBatonMsg
    
    ForcesArtworkGeneratorAnim subModel ->
      ForcesArtworkGenerator.subscriptions subModel
        |> Sub.map ForcesArtworkGeneratorMsg
    
    ForcesBlowingWindAnim subModel ->
      ForcesBlowingWind.subscriptions subModel
        |> Sub.map ForcesBlowingWindMsg
    
    AngularMovementFallingBoulderAnim subModel ->
      AngularMovementFallingBoulder.subscriptions subModel
        |> Sub.map AngularMovementFallingBoulderMsg
    
    ForcesBlowingWindWithGravityAnim subModel ->
      ForcesBlowingWindWithGravity.subscriptions subModel
        |> Sub.map ForcesBlowingWindWithGravityMsg
    
    NoiseAnimatedBoxAnim subModel ->
      NoiseAnimatedBox.subscriptions subModel
        |> Sub.map NoiseAnimatedBoxMsg
    
    AngularMovementManyOrbitsWithDynamicRotationAnim subModel ->
      AngularMovementManyOrbitsWithDynamicRotation.subscriptions subModel
        |> Sub.map AngularMovementManyOrbitsWithDynamicRotationMsg
    
    ForcesBlowingWindWithGravityAndFrictionAnim subModel ->
      ForcesBlowingWindWithGravityAndFriction.subscriptions subModel
        |> Sub.map ForcesBlowingWindWithGravityAndFrictionMsg
    
    OscillationsManyWavesAnim subModel ->
      OscillationsManyWaves.subscriptions subModel
        |> Sub.map OscillationsManyWavesMsg
    
    NoiseMountainRangeAnim subModel ->
      NoiseMountainRange.subscriptions subModel
        |> Sub.map NoiseMountainRangeMsg
    
    AngularMovementManyOrbitsWithRotationAnim subModel ->
      AngularMovementManyOrbitsWithRotation.subscriptions subModel
        |> Sub.map AngularMovementManyOrbitsWithRotationMsg
    
    ForcesFloatingBalloonAnim subModel ->
      ForcesFloatingBalloon.subscriptions subModel
        |> Sub.map ForcesFloatingBalloonMsg
    
    OscillationsOscillatorsAnim subModel ->
      OscillationsOscillators.subscriptions subModel
        |> Sub.map OscillationsOscillatorsMsg
    
    NoisePerlinAnim subModel ->
      NoisePerlin.subscriptions subModel
        |> Sub.map NoisePerlinMsg
    
    AngularMovementPolarSwingAnim subModel ->
      AngularMovementPolarSwing.subscriptions subModel
        |> Sub.map AngularMovementPolarSwingMsg
    
    ForcesManyBallsAnim subModel ->
      ForcesManyBalls.subscriptions subModel
        |> Sub.map ForcesManyBallsMsg
    
    OscillationsPendulumAnim subModel ->
      OscillationsPendulum.subscriptions subModel
        |> Sub.map OscillationsPendulumMsg
    
    NoisePerlinBoxAnim subModel ->
      NoisePerlinBox.subscriptions subModel
        |> Sub.map NoisePerlinBoxMsg
    
    RandomWalksDirectedAnim subModel ->
      RandomWalksDirected.subscriptions subModel
        |> Sub.map RandomWalksDirectedMsg
    
    AngularMovementSpinningBatonAnim subModel ->
      AngularMovementSpinningBaton.subscriptions subModel
        |> Sub.map AngularMovementSpinningBatonMsg
    
    ForcesManyOrbitsAnim subModel ->
      ForcesManyOrbits.subscriptions subModel
        |> Sub.map ForcesManyOrbitsMsg
    
    OscillationsRainbowSlinkyAnim subModel ->
      OscillationsRainbowSlinky.subscriptions subModel
        |> Sub.map OscillationsRainbowSlinkyMsg
    
    NoisePerlinStepWalkerAnim subModel ->
      NoisePerlinStepWalker.subscriptions subModel
        |> Sub.map NoisePerlinStepWalkerMsg
    
    RandomWalksGaussianAnim subModel ->
      RandomWalksGaussian.subscriptions subModel
        |> Sub.map RandomWalksGaussianMsg
    
    VectorAccelerateTowardsMouseAnim subModel ->
      VectorAccelerateTowardsMouse.subscriptions subModel
        |> Sub.map VectorAccelerateTowardsMouseMsg
    
    AngularMovementSpiralDrawerAnim subModel ->
      AngularMovementSpiralDrawer.subscriptions subModel
        |> Sub.map AngularMovementSpiralDrawerMsg
    
    ForcesMutualAttractionAnim subModel ->
      ForcesMutualAttraction.subscriptions subModel
        |> Sub.map ForcesMutualAttractionMsg
    
    OscillationsSimpleHarmonicMotionAnim subModel ->
      OscillationsSimpleHarmonicMotion.subscriptions subModel
        |> Sub.map OscillationsSimpleHarmonicMotionMsg
    
    NoisePerlinWalkerAnim subModel ->
      NoisePerlinWalker.subscriptions subModel
        |> Sub.map NoisePerlinWalkerMsg
    
    RandomWalksImprovedAnim subModel ->
      RandomWalksImproved.subscriptions subModel
        |> Sub.map RandomWalksImprovedMsg
    
    VectorBouncingBallAnim subModel ->
      VectorBouncingBall.subscriptions subModel
        |> Sub.map VectorBouncingBallMsg
    
    ForcesMutualRepulsionAnim subModel ->
      ForcesMutualRepulsion.subscriptions subModel
        |> Sub.map ForcesMutualRepulsionMsg
    
    OscillationsSimpleHarmonicMotionWithAngleAnim subModel ->
      OscillationsSimpleHarmonicMotionWithAngle.subscriptions subModel
        |> Sub.map OscillationsSimpleHarmonicMotionWithAngleMsg
    
    NoiseRandomBoxAnim subModel ->
      NoiseRandomBox.subscriptions subModel
        |> Sub.map NoiseRandomBoxMsg
    
    RandomWalksLevyAnim subModel ->
      RandomWalksLevy.subscriptions subModel
        |> Sub.map RandomWalksLevyMsg
    
    VectorBouncingBallWithVectorAnim subModel ->
      VectorBouncingBallWithVector.subscriptions subModel
        |> Sub.map VectorBouncingBallWithVectorMsg
    
    ForcesResistanceAnim subModel ->
      ForcesResistance.subscriptions subModel
        |> Sub.map ForcesResistanceMsg
    
    OscillationsSineWaveAnim subModel ->
      OscillationsSineWave.subscriptions subModel
        |> Sub.map OscillationsSineWaveMsg
    
    RandomWalksMonteCarloAnim subModel ->
      RandomWalksMonteCarlo.subscriptions subModel
        |> Sub.map RandomWalksMonteCarloMsg
    
    VectorBrakingCarAnim subModel ->
      VectorBrakingCar.subscriptions subModel
        |> Sub.map VectorBrakingCarMsg
    
    ForcesSingleOrbitAnim subModel ->
      ForcesSingleOrbit.subscriptions subModel
        |> Sub.map ForcesSingleOrbitMsg
    
    OscillationsStaticSineWaveAnim subModel ->
      OscillationsStaticSineWave.subscriptions subModel
        |> Sub.map OscillationsStaticSineWaveMsg
    
    RandomWalksNormalDistributionAnim subModel ->
      RandomWalksNormalDistribution.subscriptions subModel
        |> Sub.map RandomWalksNormalDistributionMsg
    
    VectorConstantAccelerationAnim subModel ->
      VectorConstantAcceleration.subscriptions subModel
        |> Sub.map VectorConstantAccelerationMsg
    
    ForcesSinkingLogsAnim subModel ->
      ForcesSinkingLogs.subscriptions subModel
        |> Sub.map ForcesSinkingLogsMsg
    
    RandomWalksPaintSplatterAnim subModel ->
      RandomWalksPaintSplatter.subscriptions subModel
        |> Sub.map RandomWalksPaintSplatterMsg
    
    VectorConstantVelocityAnim subModel ->
      VectorConstantVelocity.subscriptions subModel
        |> Sub.map VectorConstantVelocityMsg
    
    ForcesWallBallsAnim subModel ->
      ForcesWallBalls.subscriptions subModel
        |> Sub.map ForcesWallBallsMsg
    
    VectorGroupAccelerateTowardsMouseAnim subModel ->
      VectorGroupAccelerateTowardsMouse.subscriptions subModel
        |> Sub.map VectorGroupAccelerateTowardsMouseMsg
    
    VectorMouseStalkerAnim subModel ->
      VectorMouseStalker.subscriptions subModel
        |> Sub.map VectorMouseStalkerMsg
    
    VectorMouseTracingAnim subModel ->
      VectorMouseTracing.subscriptions subModel
        |> Sub.map VectorMouseTracingMsg
    
    VectorMouseTracingNormalizedAnim subModel ->
      VectorMouseTracingNormalized.subscriptions subModel
        |> Sub.map VectorMouseTracingNormalizedMsg
    
    VectorMouseTracingScaledAnim subModel ->
      VectorMouseTracingScaled.subscriptions subModel
        |> Sub.map VectorMouseTracingScaledMsg
    
    VectorMouseTracingWithMagnitudeAnim subModel ->
      VectorMouseTracingWithMagnitude.subscriptions subModel
        |> Sub.map VectorMouseTracingWithMagnitudeMsg
    
    VectorRandomAccelerationAnim subModel ->
      VectorRandomAcceleration.subscriptions subModel
        |> Sub.map VectorRandomAccelerationMsg
    
    VectorScalingSaberAnim subModel ->
      VectorScalingSaber.subscriptions subModel
        |> Sub.map VectorScalingSaberMsg
    
    VectorWalkerWithVectorAnim subModel ->
      VectorWalkerWithVector.subscriptions subModel
        |> Sub.map VectorWalkerWithVectorMsg
    

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
    ]
    (E.row
      [ E.width E.fill
      , E.height E.fill
      ]
      [ E.column
        [ E.width E.fill
        , E.height E.fill
        ]
        [ model
          |> demoView
          |> E.html
        ]
      , E.column
        [ E.width E.fill
        , E.height E.fill
        , E.spacing 20
        ]
        [ E.el
          [ onClick (Select RandomWalksBasic)
          , E.pointer
          ]
          (E.text "Basic Walker")
        , E.el
          [ onClick (Select AngularMovementAccelerateTowardsMouse)
          , E.pointer
          ]
          (E.text "AccelerateTowardsMouse")
        , E.el
          [ onClick (Select AngularMovementAcceleratingBaton)
          , E.pointer
          ]
          (E.text "AcceleratingBaton")
        , E.el
          [ onClick (Select ForcesArtworkGenerator)
          , E.pointer
          ]
          (E.text "ArtworkGenerator")
        , E.el
          [ onClick (Select ForcesBlowingWind)
          , E.pointer
          ]
          (E.text "BlowingWind")
        , E.el
          [ onClick (Select AngularMovementFallingBoulder)
          , E.pointer
          ]
          (E.text "FallingBoulder")
        , E.el
          [ onClick (Select ForcesBlowingWindWithGravity)
          , E.pointer
          ]
          (E.text "BlowingWindWithGravity")
        , E.el
          [ onClick (Select NoiseAnimatedBox)
          , E.pointer
          ]
          (E.text "AnimatedBox")
        , E.el
          [ onClick (Select AngularMovementManyOrbitsWithDynamicRotation)
          , E.pointer
          ]
          (E.text "ManyOrbitsWithDynamicRotation")
        , E.el
          [ onClick (Select ForcesBlowingWindWithGravityAndFriction)
          , E.pointer
          ]
          (E.text "BlowingWindWithGravityAndFriction")
        , E.el
          [ onClick (Select OscillationsManyWaves)
          , E.pointer
          ]
          (E.text "ManyWaves")
        , E.el
          [ onClick (Select NoiseMountainRange)
          , E.pointer
          ]
          (E.text "MountainRange")
        , E.el
          [ onClick (Select AngularMovementManyOrbitsWithRotation)
          , E.pointer
          ]
          (E.text "ManyOrbitsWithRotation")
        , E.el
          [ onClick (Select ForcesFloatingBalloon)
          , E.pointer
          ]
          (E.text "FloatingBalloon")
        , E.el
          [ onClick (Select OscillationsOscillators)
          , E.pointer
          ]
          (E.text "Oscillators")
        , E.el
          [ onClick (Select NoisePerlin)
          , E.pointer
          ]
          (E.text "Perlin")
        , E.el
          [ onClick (Select AngularMovementPolarSwing)
          , E.pointer
          ]
          (E.text "PolarSwing")
        , E.el
          [ onClick (Select ForcesManyBalls)
          , E.pointer
          ]
          (E.text "ManyBalls")
        , E.el
          [ onClick (Select OscillationsPendulum)
          , E.pointer
          ]
          (E.text "Pendulum")
        , E.el
          [ onClick (Select NoisePerlinBox)
          , E.pointer
          ]
          (E.text "PerlinBox")
        , E.el
          [ onClick (Select RandomWalksDirected)
          , E.pointer
          ]
          (E.text "Directed")
        , E.el
          [ onClick (Select AngularMovementSpinningBaton)
          , E.pointer
          ]
          (E.text "SpinningBaton")
        , E.el
          [ onClick (Select ForcesManyOrbits)
          , E.pointer
          ]
          (E.text "ManyOrbits")
        , E.el
          [ onClick (Select OscillationsRainbowSlinky)
          , E.pointer
          ]
          (E.text "RainbowSlinky")
        , E.el
          [ onClick (Select NoisePerlinStepWalker)
          , E.pointer
          ]
          (E.text "PerlinStepWalker")
        , E.el
          [ onClick (Select RandomWalksGaussian)
          , E.pointer
          ]
          (E.text "Gaussian")
        , E.el
          [ onClick (Select VectorAccelerateTowardsMouse)
          , E.pointer
          ]
          (E.text "AccelerateTowardsMouse")
        , E.el
          [ onClick (Select AngularMovementSpiralDrawer)
          , E.pointer
          ]
          (E.text "SpiralDrawer")
        , E.el
          [ onClick (Select ForcesMutualAttraction)
          , E.pointer
          ]
          (E.text "MutualAttraction")
        , E.el
          [ onClick (Select OscillationsSimpleHarmonicMotion)
          , E.pointer
          ]
          (E.text "SimpleHarmonicMotion")
        , E.el
          [ onClick (Select NoisePerlinWalker)
          , E.pointer
          ]
          (E.text "PerlinWalker")
        , E.el
          [ onClick (Select RandomWalksImproved)
          , E.pointer
          ]
          (E.text "Improved")
        , E.el
          [ onClick (Select VectorBouncingBall)
          , E.pointer
          ]
          (E.text "BouncingBall")
        , E.el
          [ onClick (Select ForcesMutualRepulsion)
          , E.pointer
          ]
          (E.text "MutualRepulsion")
        , E.el
          [ onClick (Select OscillationsSimpleHarmonicMotionWithAngle)
          , E.pointer
          ]
          (E.text "SimpleHarmonicMotionWithAngle")
        , E.el
          [ onClick (Select NoiseRandomBox)
          , E.pointer
          ]
          (E.text "RandomBox")
        , E.el
          [ onClick (Select RandomWalksLevy)
          , E.pointer
          ]
          (E.text "Levy")
        , E.el
          [ onClick (Select VectorBouncingBallWithVector)
          , E.pointer
          ]
          (E.text "BouncingBallWithVector")
        , E.el
          [ onClick (Select ForcesResistance)
          , E.pointer
          ]
          (E.text "Resistance")
        , E.el
          [ onClick (Select OscillationsSineWave)
          , E.pointer
          ]
          (E.text "SineWave")
        , E.el
          [ onClick (Select RandomWalksMonteCarlo)
          , E.pointer
          ]
          (E.text "MonteCarlo")
        , E.el
          [ onClick (Select VectorBrakingCar)
          , E.pointer
          ]
          (E.text "BrakingCar")
        , E.el
          [ onClick (Select ForcesSingleOrbit)
          , E.pointer
          ]
          (E.text "SingleOrbit")
        , E.el
          [ onClick (Select OscillationsStaticSineWave)
          , E.pointer
          ]
          (E.text "StaticSineWave")
        , E.el
          [ onClick (Select RandomWalksNormalDistribution)
          , E.pointer
          ]
          (E.text "NormalDistribution")
        , E.el
          [ onClick (Select VectorConstantAcceleration)
          , E.pointer
          ]
          (E.text "ConstantAcceleration")
        , E.el
          [ onClick (Select ForcesSinkingLogs)
          , E.pointer
          ]
          (E.text "SinkingLogs")
        , E.el
          [ onClick (Select RandomWalksPaintSplatter)
          , E.pointer
          ]
          (E.text "PaintSplatter")
        , E.el
          [ onClick (Select VectorConstantVelocity)
          , E.pointer
          ]
          (E.text "ConstantVelocity")
        , E.el
          [ onClick (Select ForcesWallBalls)
          , E.pointer
          ]
          (E.text "WallBalls")
        , E.el
          [ onClick (Select VectorGroupAccelerateTowardsMouse)
          , E.pointer
          ]
          (E.text "GroupAccelerateTowardsMouse")
        , E.el
          [ onClick (Select VectorMouseStalker)
          , E.pointer
          ]
          (E.text "MouseStalker")
        , E.el
          [ onClick (Select VectorMouseTracing)
          , E.pointer
          ]
          (E.text "MouseTracing")
        , E.el
          [ onClick (Select VectorMouseTracingNormalized)
          , E.pointer
          ]
          (E.text "MouseTracingNormalized")
        , E.el
          [ onClick (Select VectorMouseTracingScaled)
          , E.pointer
          ]
          (E.text "MouseTracingScaled")
        , E.el
          [ onClick (Select VectorMouseTracingWithMagnitude)
          , E.pointer
          ]
          (E.text "MouseTracingWithMagnitude")
        , E.el
          [ onClick (Select VectorRandomAcceleration)
          , E.pointer
          ]
          (E.text "RandomAcceleration")
        , E.el
          [ onClick (Select VectorScalingSaber)
          , E.pointer
          ]
          (E.text "ScalingSaber")
        , E.el
          [ onClick (Select VectorWalkerWithVector)
          , E.pointer
          ]
          (E.text "WalkerWithVector")
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
    , case model of
      RandomWalksBasicAnim subModel ->
        RandomWalksBasic.view subModel
          |> Html.map BasicWalkerMsg
      AngularMovementAccelerateTowardsMouseAnim subModel ->
        AngularMovementAccelerateTowardsMouse.view subModel
          |> Html.map AngularMovementAccelerateTowardsMouseMsg
      
      AngularMovementAcceleratingBatonAnim subModel ->
        AngularMovementAcceleratingBaton.view subModel
          |> Html.map AngularMovementAcceleratingBatonMsg
      
      ForcesArtworkGeneratorAnim subModel ->
        ForcesArtworkGenerator.view subModel
          |> Html.map ForcesArtworkGeneratorMsg
      
      ForcesBlowingWindAnim subModel ->
        ForcesBlowingWind.view subModel
          |> Html.map ForcesBlowingWindMsg
      
      AngularMovementFallingBoulderAnim subModel ->
        AngularMovementFallingBoulder.view subModel
          |> Html.map AngularMovementFallingBoulderMsg
      
      ForcesBlowingWindWithGravityAnim subModel ->
        ForcesBlowingWindWithGravity.view subModel
          |> Html.map ForcesBlowingWindWithGravityMsg
      
      NoiseAnimatedBoxAnim subModel ->
        NoiseAnimatedBox.view subModel
          |> Html.map NoiseAnimatedBoxMsg
      
      AngularMovementManyOrbitsWithDynamicRotationAnim subModel ->
        AngularMovementManyOrbitsWithDynamicRotation.view subModel
          |> Html.map AngularMovementManyOrbitsWithDynamicRotationMsg
      
      ForcesBlowingWindWithGravityAndFrictionAnim subModel ->
        ForcesBlowingWindWithGravityAndFriction.view subModel
          |> Html.map ForcesBlowingWindWithGravityAndFrictionMsg
      
      OscillationsManyWavesAnim subModel ->
        OscillationsManyWaves.view subModel
          |> Html.map OscillationsManyWavesMsg
      
      NoiseMountainRangeAnim subModel ->
        NoiseMountainRange.view subModel
          |> Html.map NoiseMountainRangeMsg
      
      AngularMovementManyOrbitsWithRotationAnim subModel ->
        AngularMovementManyOrbitsWithRotation.view subModel
          |> Html.map AngularMovementManyOrbitsWithRotationMsg
      
      ForcesFloatingBalloonAnim subModel ->
        ForcesFloatingBalloon.view subModel
          |> Html.map ForcesFloatingBalloonMsg
      
      OscillationsOscillatorsAnim subModel ->
        OscillationsOscillators.view subModel
          |> Html.map OscillationsOscillatorsMsg
      
      NoisePerlinAnim subModel ->
        NoisePerlin.view subModel
          |> Html.map NoisePerlinMsg
      
      AngularMovementPolarSwingAnim subModel ->
        AngularMovementPolarSwing.view subModel
          |> Html.map AngularMovementPolarSwingMsg
      
      ForcesManyBallsAnim subModel ->
        ForcesManyBalls.view subModel
          |> Html.map ForcesManyBallsMsg
      
      OscillationsPendulumAnim subModel ->
        OscillationsPendulum.view subModel
          |> Html.map OscillationsPendulumMsg
      
      NoisePerlinBoxAnim subModel ->
        NoisePerlinBox.view subModel
          |> Html.map NoisePerlinBoxMsg
      
      RandomWalksDirectedAnim subModel ->
        RandomWalksDirected.view subModel
          |> Html.map RandomWalksDirectedMsg
      
      AngularMovementSpinningBatonAnim subModel ->
        AngularMovementSpinningBaton.view subModel
          |> Html.map AngularMovementSpinningBatonMsg
      
      ForcesManyOrbitsAnim subModel ->
        ForcesManyOrbits.view subModel
          |> Html.map ForcesManyOrbitsMsg
      
      OscillationsRainbowSlinkyAnim subModel ->
        OscillationsRainbowSlinky.view subModel
          |> Html.map OscillationsRainbowSlinkyMsg
      
      NoisePerlinStepWalkerAnim subModel ->
        NoisePerlinStepWalker.view subModel
          |> Html.map NoisePerlinStepWalkerMsg
      
      RandomWalksGaussianAnim subModel ->
        RandomWalksGaussian.view subModel
          |> Html.map RandomWalksGaussianMsg
      
      VectorAccelerateTowardsMouseAnim subModel ->
        VectorAccelerateTowardsMouse.view subModel
          |> Html.map VectorAccelerateTowardsMouseMsg
      
      AngularMovementSpiralDrawerAnim subModel ->
        AngularMovementSpiralDrawer.view subModel
          |> Html.map AngularMovementSpiralDrawerMsg
      
      ForcesMutualAttractionAnim subModel ->
        ForcesMutualAttraction.view subModel
          |> Html.map ForcesMutualAttractionMsg
      
      OscillationsSimpleHarmonicMotionAnim subModel ->
        OscillationsSimpleHarmonicMotion.view subModel
          |> Html.map OscillationsSimpleHarmonicMotionMsg
      
      NoisePerlinWalkerAnim subModel ->
        NoisePerlinWalker.view subModel
          |> Html.map NoisePerlinWalkerMsg
      
      RandomWalksImprovedAnim subModel ->
        RandomWalksImproved.view subModel
          |> Html.map RandomWalksImprovedMsg
      
      VectorBouncingBallAnim subModel ->
        VectorBouncingBall.view subModel
          |> Html.map VectorBouncingBallMsg
      
      ForcesMutualRepulsionAnim subModel ->
        ForcesMutualRepulsion.view subModel
          |> Html.map ForcesMutualRepulsionMsg
      
      OscillationsSimpleHarmonicMotionWithAngleAnim subModel ->
        OscillationsSimpleHarmonicMotionWithAngle.view subModel
          |> Html.map OscillationsSimpleHarmonicMotionWithAngleMsg
      
      NoiseRandomBoxAnim subModel ->
        NoiseRandomBox.view subModel
          |> Html.map NoiseRandomBoxMsg
      
      RandomWalksLevyAnim subModel ->
        RandomWalksLevy.view subModel
          |> Html.map RandomWalksLevyMsg
      
      VectorBouncingBallWithVectorAnim subModel ->
        VectorBouncingBallWithVector.view subModel
          |> Html.map VectorBouncingBallWithVectorMsg
      
      ForcesResistanceAnim subModel ->
        ForcesResistance.view subModel
          |> Html.map ForcesResistanceMsg
      
      OscillationsSineWaveAnim subModel ->
        OscillationsSineWave.view subModel
          |> Html.map OscillationsSineWaveMsg
      
      RandomWalksMonteCarloAnim subModel ->
        RandomWalksMonteCarlo.view subModel
          |> Html.map RandomWalksMonteCarloMsg
      
      VectorBrakingCarAnim subModel ->
        VectorBrakingCar.view subModel
          |> Html.map VectorBrakingCarMsg
      
      ForcesSingleOrbitAnim subModel ->
        ForcesSingleOrbit.view subModel
          |> Html.map ForcesSingleOrbitMsg
      
      OscillationsStaticSineWaveAnim subModel ->
        OscillationsStaticSineWave.view subModel
          |> Html.map OscillationsStaticSineWaveMsg
      
      RandomWalksNormalDistributionAnim subModel ->
        RandomWalksNormalDistribution.view subModel
          |> Html.map RandomWalksNormalDistributionMsg
      
      VectorConstantAccelerationAnim subModel ->
        VectorConstantAcceleration.view subModel
          |> Html.map VectorConstantAccelerationMsg
      
      ForcesSinkingLogsAnim subModel ->
        ForcesSinkingLogs.view subModel
          |> Html.map ForcesSinkingLogsMsg
      
      RandomWalksPaintSplatterAnim subModel ->
        RandomWalksPaintSplatter.view subModel
          |> Html.map RandomWalksPaintSplatterMsg
      
      VectorConstantVelocityAnim subModel ->
        VectorConstantVelocity.view subModel
          |> Html.map VectorConstantVelocityMsg
      
      ForcesWallBallsAnim subModel ->
        ForcesWallBalls.view subModel
          |> Html.map ForcesWallBallsMsg
      
      VectorGroupAccelerateTowardsMouseAnim subModel ->
        VectorGroupAccelerateTowardsMouse.view subModel
          |> Html.map VectorGroupAccelerateTowardsMouseMsg
      
      VectorMouseStalkerAnim subModel ->
        VectorMouseStalker.view subModel
          |> Html.map VectorMouseStalkerMsg
      
      VectorMouseTracingAnim subModel ->
        VectorMouseTracing.view subModel
          |> Html.map VectorMouseTracingMsg
      
      VectorMouseTracingNormalizedAnim subModel ->
        VectorMouseTracingNormalized.view subModel
          |> Html.map VectorMouseTracingNormalizedMsg
      
      VectorMouseTracingScaledAnim subModel ->
        VectorMouseTracingScaled.view subModel
          |> Html.map VectorMouseTracingScaledMsg
      
      VectorMouseTracingWithMagnitudeAnim subModel ->
        VectorMouseTracingWithMagnitude.view subModel
          |> Html.map VectorMouseTracingWithMagnitudeMsg
      
      VectorRandomAccelerationAnim subModel ->
        VectorRandomAcceleration.view subModel
          |> Html.map VectorRandomAccelerationMsg
      
      VectorScalingSaberAnim subModel ->
        VectorScalingSaber.view subModel
          |> Html.map VectorScalingSaberMsg
      
      VectorWalkerWithVectorAnim subModel ->
        VectorWalkerWithVector.view subModel
          |> Html.map VectorWalkerWithVectorMsg
      
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

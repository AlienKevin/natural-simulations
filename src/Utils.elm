module Utils exposing (..)

lerp : Float -> Float -> Float -> Float -> Float -> Float
lerp min1 max1 min2 max2 num =
  let
    ratio =
      abs <| (num - min1) / (max1 - min1)
  in
  min2 + ratio * (max2 - min2)
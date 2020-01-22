# natural-simulations
Natural simulations in Elm based on "Advanced JS: Natural Simulations" from Khan Academy.

# How to run simulations
Pick one of the following simulations and copy the elm code to [Ellie](https://ellie-app.com/new). See the below example on what necessary dependencies to install. Don't forget to change the module name in the Elm initialization in Html.

```html
<script>
    // remember to change `RandomWalks.Basic` to the current module name
    var app = Elm.RandomWalks.Basic.init({ node: document.querySelector('main') })
    // you can use ports and stuff here
  </script>
```

<iframe src="https://ellie-app.com/embed/7Q8sWsv5KH3a1" style="width:100%; height:400px; border:0; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

# Table of Contents
## Randomness
Random walks
  - [Basic walker](./src/RandomWalks/Basic.elm) - [Try it out!](https://ellie-app.com/7Q8sWsv5KH3a1)
  - [Improved walker](./src/RandomWalks/Improved.elm)

Challenge: Random blobber
  - Same as [Improved walker](./src/RandomWalks/Improved.elm)

Probability & non-uniform distributions
  - [Directed walker](./src/RandomWalks/Directed.elm) that moves to the right

Challenge: Up walker
  - You can slightly modify the [Directed walker](./src/RandomWalks/Directed.elm) to make it move up

Normal distribution of random numbers
  - [Normal Distribution](./src/RandomWalks/NormalDistribution.elm)

Challenge: Gaussian walk
  - [Gaussian walker](./src/RandomWalks/Gaussian.elm)

Custom distribution of random numbers
  - [Monte Carlo](./src/RandomWalks/MonteCarlo.elm)

Challenge: Lévy walker
  - [Lévy Walker](./src/RandomWalks/Levy.elm)

Project: Paint splatter
  - [Paint Splatter](./src/RandomWalks/PaintSplatter.elm)

# Licenses
All code are made available under the following license: MIT license.

All non-code (such as writing, drawings, images, etc.) are also owned by their respective author and made available under the following license: Creative Commons Attribution License.
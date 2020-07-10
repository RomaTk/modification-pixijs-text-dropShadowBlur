
# modification-pixijs-text-dropShadowBlur

  

  

The **pixijs** has a huge problem with *dropShadowBlur* property...

  

![the problem](https://raw.githubusercontent.com/RomaTk/modification-pixijs-text-dropShadowBlur/readme/imagesReadme/original.jpg)

  

The purpose of this modification is to get rid of cut shadow and show it normally as in any other app for design. And give a way how to increase it ( **Intensity** property ).

  

**Result of modification:**

  

![the solution](https://raw.githubusercontent.com/RomaTk/modification-pixijs-text-dropShadowBlur/readme/imagesReadme/modified.jpg)

  

It works with **any textStyle properties**.

  

## How to use

  

![enter image description here](https://raw.githubusercontent.com/RomaTk/modification-pixijs-text-dropShadowBlur/readme/imagesReadme/useExplanation.png)

  

**!!!WARNINGS!!!**

  

1) The copy made by function create "modifiedText" with some properties according to "textToModify" object:

  

- x,y position

- width and height

- anchor

- pivot

- text

- style

If you want to change these properties you should do it with "textToModify" object and then create a new copy by the "someName" function. All other properties you should implement with the copy.

*you can change that by writing function by yourself (or you can write to me and I will implement function adding to project )*

  ### *Intensity*
  
![enter image description here](https://raw.githubusercontent.com/RomaTk/modification-pixijs-text-dropShadowBlur/readme/imagesReadme/intensity.png)

Intensity is a value to increase the alpha of shadow and it is used to create **bigger shadow or brighter**. This property is **optional**.
"valueOfIntensity" should be a number > 0 and the result depends only on integer part of the value.

**!!!WARNINGS!!!**
- Using this property is working with children of the object
- The value shouldn't be big because it reduces render possibility.



## Footer

  

Written by **Roman Tkachenko** (rt.craz@gmail.com)

  

If you have any questions or suggestions you can write in Github or using email. I will try to answer everybody.

  

#pixijs #bug #js #front-ent #modification
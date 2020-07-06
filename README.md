# modification-pixijs-text-dropShadowBlur

  

The **pixijs** has a huge problem with *dropShadowBlur* property...

![the problem](https://raw.githubusercontent.com/RomaTk/modification-pixijs-text-dropShadowBlur/readme/imagesReadme/original.jpg)

The porpuse of this modification is to get rid of cutted shadow and show it normaly as in any other app for design.

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
 
	If you want to change this properties you should do it with "textToModify" object and than create a new copy by the "someName" function. All other properties you should implement with copy.
	
*you can change that by writting function by yourself (or you can write me and I will implement function adding to project )*

  

## Footer

Written by **Roman Tkachenko** (rt.craz@gmail.com)

If you have any questions or suggestions you can write in github or using email. I will try to answer everybody.

#pixijs #bug #js #front-ent #modification
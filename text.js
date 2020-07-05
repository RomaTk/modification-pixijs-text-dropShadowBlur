import PIXI from './pixi.js'
import modify from './textModification.js'

const app = new PIXI.Application({backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

const style = new PIXI.TextStyle({
	align: "center",
	dropShadow: true,
	dropShadowAngle: 0,
	dropShadowBlur: 54,
	dropShadowColor: "#cb009f",
	dropShadowDistance: 0,
	fill: "white",
	fontFamily: "Helvetica",
	fontSize: 100,
	fontVariant: "small-caps",
	fontWeight: "bolder",
	letterSpacing: 2,
	lineHeight: 60,
	lineJoin: "round",
	stroke: "#f0b",
	strokeThickness: 4,
	whiteSpace: "pre",
	wordWrap: true,
	breakWords: true,
	wordWrapWidth: 1000
});
const modifiedText = new PIXI.Text('Some   Text', style);
modifiedText.x = 50;
modifiedText.y = 200;
const modifiedCopy = modify(modifiedText);
modifiedCopy.y += 100;

app.stage.addChild(modifiedText);
app.stage.addChild(modifiedCopy);
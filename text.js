import PIXI from './pixi.js'
import modify from './textModification.js'

const app = new PIXI.Application({backgroundColor: 0x1099bb});
document.body.appendChild(app.view);

const style = new PIXI.TextStyle({
	align: "right",
	dropShadow: true,
	dropShadowAngle: 0,
	dropShadowBlur: 500,
	dropShadowColor: "#cb009f",
	dropShadowDistance: 0,
	fill: "hsla(120,100%,50%,1)",
	fontFamily: "Helvetica",
	fontSize: 100,
	fontVariant: "small-caps",
	fontWeight: "bolder",
	letterSpacing: 2,
	lineHeight: 60,
	lineJoin: "round",
	stroke: "#f0b",
	strokeThickness: 0,
	whiteSpace: "pre",
	wordWrap: true,
	breakWords: true,
	wordWrapWidth: 1000
});
const modifiedText = new PIXI.Text('Big win', style);
modifiedText.x = 50;
modifiedText.y = 200;
//modifiedText.width = 400;
modifiedText.anchor.set(0.1, 0.7);
modifiedText.pivot.y = 30;
const modifiedCopy = modify(modifiedText, 0);
const container = new PIXI.Container();
container.x = 0;
container.y = 100;

app.stage.addChild(container);
container.addChild(modifiedCopy);
//modifiedCopy.y += 200;
//container.addChild(modifiedText);
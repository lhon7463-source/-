import{r as x,R as ae,T as oe,P as te,M as ne,j as ue}from"./index-CwmxzIBf.js";const C=i=>{const u=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(i);return u?[parseInt(u[1],16)/255,parseInt(u[2],16)/255,parseInt(u[3],16)/255]:[1,1,1]},re=`#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}`,ie=`#version 300 es
precision highp float;
uniform vec2 iResolution;
uniform float iTime;
uniform float uTimeSpeed;
uniform float uColorBalance;
uniform float uWarpStrength;
uniform float uWarpFrequency;
uniform float uWarpSpeed;
uniform float uWarpAmplitude;
uniform float uBlendAngle;
uniform float uBlendSoftness;
uniform float uRotationAmount;
uniform float uNoiseScale;
uniform float uGrainAmount;
uniform float uGrainScale;
uniform float uGrainAnimated;
uniform float uContrast;
uniform float uGamma;
uniform float uSaturation;
uniform vec2 uCenterOffset;
uniform float uZoom;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
out vec4 fragColor;

#define PI 3.14159265
#define S(a,b,t) smoothstep(a,b,t)

mat2 Rot(float a){
  float s=sin(a),c=cos(a);
  return mat2(c,-s,s,c);
}

vec2 hash(vec2 p){
  p=vec2(dot(p,vec2(2127.1,81.17)),dot(p,vec2(1269.5,283.37)));
  return fract(sin(p)*43758.5453);
}

float noise(vec2 p){
  vec2 i=floor(p),f=fract(p),u=f*f*(3.0-2.0*f);
  float n=mix(
    mix(dot(-1.0+2.0*hash(i+vec2(0.0,0.0)),f-vec2(0.0,0.0)),
        dot(-1.0+2.0*hash(i+vec2(1.0,0.0)),f-vec2(1.0,0.0)),u.x),
    mix(dot(-1.0+2.0*hash(i+vec2(0.0,1.0)),f-vec2(0.0,1.0)),
        dot(-1.0+2.0*hash(i+vec2(1.0,1.0)),f-vec2(1.0,1.0)),u.x),
    u.y
  );
  return 0.5+0.5*n;
}

void mainImage(out vec4 o, vec2 C){
  float t=iTime*uTimeSpeed;
  vec2 uv=C/iResolution.xy;
  float ratio=iResolution.x/iResolution.y;
  vec2 tuv=uv-0.5+uCenterOffset;
  tuv/=max(uZoom,0.001);

  float degree=noise(vec2(t*0.1,tuv.x*tuv.y)*uNoiseScale);
  tuv.y*=1.0/ratio;
  tuv*=Rot(radians((degree-0.5)*uRotationAmount+180.0));
  tuv.y*=ratio;

  float frequency=uWarpFrequency;
  float ws=max(uWarpStrength,0.001);
  float amplitude=uWarpAmplitude/ws;
  float warpTime=t*uWarpSpeed;
  tuv.x+=sin(tuv.y*frequency+warpTime)/amplitude;
  tuv.y+=sin(tuv.x*(frequency*1.5)+warpTime)/(amplitude*0.5);

  vec3 colLav=uColor1;
  vec3 colOrg=uColor2;
  vec3 colDark=uColor3;
  float b=uColorBalance;
  float s=max(uBlendSoftness,0.0);
  mat2 blendRot=Rot(radians(uBlendAngle));
  float blendX=(tuv*blendRot).x;
  float edge0=-0.3-b-s;
  float edge1=0.2-b+s;
  float v0=0.5-b+s;
  float v1=-0.3-b-s;
  vec3 layer1=mix(colDark,colOrg,S(edge0,edge1,blendX));
  vec3 layer2=mix(colOrg,colLav,S(edge0,edge1,blendX));
  vec3 col=mix(layer1,layer2,S(v0,v1,tuv.y));

  vec2 grainUv=uv*max(uGrainScale,0.001);
  if(uGrainAnimated>0.5){ grainUv+=vec2(iTime*0.05); }
  float grain=fract(sin(dot(grainUv,vec2(12.9898,78.233)))*43758.5453);
  col+=(grain-0.5)*uGrainAmount;

  col=(col-0.5)*uContrast+0.5;
  float luma=dot(col,vec3(0.2126,0.7152,0.0722));
  col=mix(vec3(luma),col,uSaturation);
  col=pow(max(col,0.0),vec3(1.0/max(uGamma,0.001)));
  col=clamp(col,0.0,1.0);
  o=vec4(col,1.0);
}

void main(){
  vec4 o=vec4(0.0);
  mainImage(o,gl_FragCoord.xy);
  fragColor=o;
}`,S=new WeakMap;function se({timeSpeed:i=.25,colorBalance:u=0,warpStrength:w=1,warpFrequency:A=5,warpSpeed:R=2,warpAmplitude:b=50,blendAngle:F=0,blendSoftness:W=.05,rotationAmount:B=500,noiseScale:G=2,grainAmount:T=.1,grainScale:M=2,grainAnimated:I=!1,contrast:O=1.5,gamma:q=1,saturation:k=1,centerX:E=0,centerY:P=0,zoom:N=.9,color1:L="#FF9FFC",color2:U="#5227FF",color3:Z="#B497CF",className:H="",randomBurst:J=!1}){const c=x.useRef(null);return x.useEffect(()=>{const o=c.current;if(!o)return;const t=new ae({webgl:2,alpha:!0,antialias:!1,dpr:Math.min(window.devicePixelRatio||1,2)}),n=t.gl,e=n.canvas;e.style.width="100%",e.style.height="100%",e.style.display="block",o.appendChild(e);const K=new oe(n),l=new te(n,{vertex:re,fragment:ie,uniforms:{iTime:{value:0},iResolution:{value:new Float32Array([1,1])},uTimeSpeed:{value:.25},uColorBalance:{value:0},uWarpStrength:{value:1},uWarpFrequency:{value:5},uWarpSpeed:{value:2},uWarpAmplitude:{value:50},uBlendAngle:{value:0},uBlendSoftness:{value:.05},uRotationAmount:{value:500},uNoiseScale:{value:2},uGrainAmount:{value:.1},uGrainScale:{value:2},uGrainAnimated:{value:0},uContrast:{value:1.5},uGamma:{value:1},uSaturation:{value:1},uCenterOffset:{value:new Float32Array([0,0])},uZoom:{value:.9},uColor1:{value:new Float32Array([1,1,1])},uColor2:{value:new Float32Array([1,1,1])},uColor3:{value:new Float32Array([1,1,1])}}}),v=new ne(n,{geometry:K,program:l});S.set(o,{renderer:t,program:l,mesh:v});const j=()=>{const a=o.getBoundingClientRect(),Y=Math.max(1,Math.floor(a.width)),ee=Math.max(1,Math.floor(a.height));t.setSize(Y,ee);const $=l.uniforms.iResolution.value;$[0]=n.drawingBufferWidth,$[1]=n.drawingBufferHeight,t.render({scene:v})},V=new ResizeObserver(j);V.observe(o),j();let r=0,f=!0,m=!document.hidden;const d=performance.now();let s=0,p=0,g=0;const z=()=>3+Math.random()*5,Q=()=>1.2+Math.random()*1.8;g=performance.now()+z()*1e3;const D=a=>{J?(a>=g&&(s=(a-d)*.001,p=a+Q()*1e3,g=p+z()*1e3),a<p&&(s=(a-d)*.001)):s=(a-d)*.001,l.uniforms.iTime.value=s*i,t.render({scene:v}),r=requestAnimationFrame(D)},h=()=>{f&&m&&r===0&&(r=requestAnimationFrame(D))},y=()=>{r!==0&&(cancelAnimationFrame(r),r=0)},X=new IntersectionObserver(([a])=>{f=a.isIntersecting,f?h():y()},{threshold:0});X.observe(o);const _=()=>{m=!document.hidden,m?h():y()};return document.addEventListener("visibilitychange",_),h(),()=>{y(),V.disconnect(),X.disconnect(),document.removeEventListener("visibilitychange",_),S.delete(o);try{o.removeChild(e)}catch{}}},[]),x.useEffect(()=>{const o=c.current;if(!o)return;const t=S.get(o);if(!t)return;const{program:n}=t,e=n.uniforms;e.uTimeSpeed.value=i,e.uColorBalance.value=u,e.uWarpStrength.value=w,e.uWarpFrequency.value=A,e.uWarpSpeed.value=R,e.uWarpAmplitude.value=b,e.uBlendAngle.value=F,e.uBlendSoftness.value=W,e.uRotationAmount.value=B,e.uNoiseScale.value=G,e.uGrainAmount.value=T,e.uGrainScale.value=M,e.uGrainAnimated.value=I?1:0,e.uContrast.value=O,e.uGamma.value=q,e.uSaturation.value=k,e.uCenterOffset.value=new Float32Array([E,P]),e.uZoom.value=N,e.uColor1.value=new Float32Array(C(L)),e.uColor2.value=new Float32Array(C(U)),e.uColor3.value=new Float32Array(C(Z))},[i,u,w,A,R,b,F,W,B,G,T,M,I,O,q,k,E,P,N,L,U,Z]),ue.jsx("div",{ref:c,className:`grainient-container ${H}`.trim()})}export{se as default};

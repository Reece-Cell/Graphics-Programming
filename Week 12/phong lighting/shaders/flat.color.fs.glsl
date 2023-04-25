precision mediump float;

uniform vec3 uLightPosition;
uniform vec3 uCameraPosition;

varying vec3 vWorldPosition;
void main(void) {
    vec3 color = vec3(1.0);

    gl_FragColor = vec4(color, 1.0);
}
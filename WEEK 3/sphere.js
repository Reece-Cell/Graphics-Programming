/*
 * An object type representing an implicit sphere.
 *
 * @param center A Vector3 object representing the position of the center of the sphere
 * @param radius A Number representing the radius of the sphere.
 * 
 * Example usage:
 * var mySphere = new Sphere(new Vector3(1, 2, 3), 4.23);
 * var myRay = new Ray(new Vector3(0, 1, -10), new Vector3(0, 1, 0));
 * var result = mySphere.raycast(myRay);
 * 
 * if (result.hit) {
 *   console.log("Got a valid intersection!");
 * }
 */

var Sphere = function(center = new Vector3(), radius = 1) {
  // Sanity checks (your modification should be below this where indicated)
  if (!(this instanceof Sphere)) {
    console.error("Sphere constructor must be called with the new operator");
  }

  this.center = center;
  this.radius = radius;

  // todo - make sure this.center and this.radius are replaced with default values if and only if they
  // are invalid or undefined (i.e. center should be of type Vector3 & radius should be a Number)
  // - the default center should be the zero vector
  // - the default radius should be 1
  // YOUR CODE HERE

  // Sanity checks (your modification should be above this)
  if (!(this.center instanceof Vector3)) {
    console.error("The sphere center must be a Vector3");
  }

  if ((typeof(this.radius) != 'number')) {
    console.error("The radius must be a Number");
  }
};

Sphere.prototype = {
  
  //----------------------------------------------------------------------------- 
  raycast: function(r1) {
    // todo - determine whether the ray intersects has a VALID intersection with this
	//        sphere and if so, where. A valid intersection is on the is in front of
	//        the ray and whose origin is NOT inside the sphere

    // Recommended steps
    // ------------------
    // 0. (optional) watch the video showing the complete implementation of plane.js
    //    You may find it useful to see a different piece of geometry coded.

    // 1. review slides/book math
    
    // 2. identity the vectors needed to solve for the coefficients in the quadratic equation

    // 3. calculate the discriminant
    
    // 4. use the discriminant to determine if further computation is necessary 
    //    if (discriminant...) { ... } else { ... }

    // 5. return the following object literal "result" based on whether the intersection
    //    is valid (i.e. the intersection is in front of the ray AND the ray is not inside
    //    the sphere)
    //    case 1: no VALID intersections
    //      var result = { hit: false, point: null }
    //    case 2: 1 or more intersections
    //      var result = {
    //        hit: true,
    //        point: 'a Vector3 containing the CLOSEST VALID intersection',
    //        normal: 'a vector3 containing a unit length normal at the intersection point',
    //        distance: 'a scalar containing the intersection distance from the ray origin'
    //      }

    // An object created from a literal that we will return as our result
    // Replace the null values in the properties below with the right values
    //Step 1, find a. a = d . d
    //d is the direction
    var d = new Vector3();
    d = r1.direction.clone();
    var o = new Vector3();
    o = r1.origin.clone();
    //----Sanity Check Proves Above Code Correct----

    var a = d.dot(d);
    //Step 2, find b. B = 2d . (o - c)
    //Setting b equal to 2d
    var b1 = new Vector3(d.x, d.y, d.z);
    b1.multiplyScalar(2);
    console.log("b1: ", b1);
    if(b == 0){
      var result = { hit:false, point:null};
      return result;       
    }
    //----Sanity Check Proves Above Code Correct----
    //Getting o - c
    var oc = new Vector3();
    oc = o;
    oc.subtract(this.center);
    var b = b1.dot(oc);
    console.log("b2: ", b);

    //Step 3, get C. C = (o - c) . (o - c). This is why we saved oc already
    var cdot = new Vector3();
    cdot = oc;
    var c = cdot.dot(oc);

    // Don't forget to multiply c by itself once, aka squaring it
    c = c * (this.radius * this.radius);

    // Log values to the console
  console.log("c:", c);
  console.log("b:", b);
  console.log("a:", a);

  //Test discriminant
    if((b * b - 4 * a * c) < 0){
      var result = { hit:false, point:null};
      return result;
    }

  //Step 4, calculate alpha
    if(b){
      var result = { hit:false, point:null};
      return result;
    }
    //Plug into quadratic equation and get alphas
    var alpha = -1;
    var a1 = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    var a2 = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    if(a1 == a2){
      var alpha = a1;
    }else{
      if(a1 < a2){
        alpha = a1;
      }else{
        alpha = a2;
      }
    }
    if(alpha < 0){
      var result = { hit:false, point:null};
      return result;       
    }
    if((a1 < 0 && a2 > -1) || (a2 < 0 && a1 > -1)){
      var result = { hit:false, point:null};
      return result;      
    }

    //Get the normal
    var inters = new Vector3();
    inters = r1.origin.clone();
    inters.add(r1.direction);
    inters.multiplyScalar(alpha);

    var norm = new Vector3();
    norm = inters.clone();
    norm.subtract(this.center);
    norm.normalize();

    //Checking final values
    console.log("Point:", o.add(d.multiplyScalar(alpha)));
    console.log("Normal:", norm);
    console.log("Distance:", alpha);

    if(alpha > 0){ 
      var result = {
        hit: true,      // should be of type Boolean
        point: o.add(d.multiplyScalar(alpha)),    // should be of type Vector3
        normal: norm,   // should be of type Vector3
        distance: alpha, // should be of type Number (scalar)
      }
     
      return result;
    }else{
      var result = {
        hit: false,      // should be of type Boolean
        point: null,    // should be of type Vector3
      };
      return result;
    }
    
  }
}

// EOF 00100001-10
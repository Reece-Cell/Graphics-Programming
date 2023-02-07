/*
 * An "object" representing a 3d vector to make operations simple and concise.
 *
 * Similar to how we work with plain numbers, we will work with vectors as
 * an entity unto itself.  Note the syntax below: var Vector3 = function...
 * This is different than you might be used to in most programming languages.
 * Here, the function is meant to be instantiated rather than called and the
 * instantiation process IS similar to other object oriented languages => new Vector3()
 */

var Vector3 = function(x = 0, y = 0, z = 0) {
  this.x = x; this.y = y; this.z = z;

  // Sanity check to prevent accidentally using this as a normal function call
  if (!(this instanceof Vector3)) {
    console.error("Vector3 constructor must be called with the 'new' operator");
  }

  // todo - make sure to set a default value in case x, y, or z is not passed in
}

Vector3.prototype = {

  //----------------------------------------------------------------------------- 
  set: function(x, y, z) {
    // todo set 'this' object's values to those from x, y, and z
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  clone: function() {
    return new Vector3(this.x, this.y, this.z);
  },

  //----------------------------------------------------------------------------- 
  copy: function(other) {
    // copy the values from other into 'this'
    this.x = other.x;
    this.y = other.y;
    this.z = other.z;
    return this;
  },

  //----------------------------------------------------------------------------- 
  negate: function() {
    // multiply 'this' vector by -1
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = (this.x * -1);
    this.y = (this.y * -1);
    this.z = (this.z * -1);
    return this;
  },

  //----------------------------------------------------------------------------- 
  add: function(v) {
    // todo - add v to 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = (this.x + v.x);
    this.y = (this.y + v.y);
    this.z = (this.z + v.z);

    return this;
  },

  //----------------------------------------------------------------------------- 
  subtract: function(v) {
    // todo - subtract v from 'this' vector
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = (this.x - v.x);
    this.y = (this.y - v.y);
    this.z = (this.z - v.z);
    return this;
  },

  //----------------------------------------------------------------------------- 
  multiplyScalar: function(scalar) {
    // multiply 'this' vector by "scalar"
    // This SHOULD change the values of this.x, this.y, and this.z
    this.x = (this.x * scalar);
    this.y = (this.y * scalar);
    this.z = (this.z * scalar);
    return this;
  },

  //----------------------------------------------------------------------------- 
  length: function() {
    // todo - return the magnitude (A.K.A. length) of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
    var mag = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z))
    return mag;
  },

  //----------------------------------------------------------------------------- 
  lengthSqr: function() {
    // todo - return the squared magnitude of this vector ||v||^2
    // This should NOT change the values of this.x, this.y, and this.z

    // There are many occasions where knowing the exact length is unnecessary 
    // and the square can be substituted instead (for performance reasons).  
    // This function should NOT have to take the square root of anything.
    // todo - return the magnitude (A.K.A. length) of 'this' vector
    // This should NOT change the values of this.x, this.y, and this.z
    var mag = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z))
    return (mag*mag);
  },

  //----------------------------------------------------------------------------- 
  normalize: function() {
    // todo - Change the components of this vector so that its magnitude will equal 1.
    // This SHOULD change the values of this.x, this.y, and this.z
    var mag = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z))
    this.x = (this.x/mag);
    this.y = (this.y/mag);
    this.z = (this.z/mag);

    return this;
  },

  //----------------------------------------------------------------------------- 
  dot: function(other) {
    // todo - return the dot product betweent this vector and "other"
    // This should NOT change the values of this.x, this.y, and this.z
    var ex = (this.x * other.x);
    var yy = (this.y * other.y);
    var ze = (this.z * other.z);
    var dot = ex + yy + ze;
    return dot;
  },


  //============================================================================= 
  // The functions below must be completed in order to receive an "A"

  //----------------------------------------------------------------------------- 
  fromTo: function(fromPoint, toPoint) {
    if (!(fromPoint instanceof Vector3) || !(toPoint instanceof Vector3)) {
      console.error("fromTo requires two vectors: 'from' and 'to'");
    }
    // todo - return the vector that goes from "fromPoint" to "toPoint"
    //        NOTE - "fromPoint" and "toPoint" should not be altered
    var x3 = toPoint.x - fromPoint.x;
    var y3 = toPoint.y - fromPoint.y;
    var z3 = toPoint.z - fromPoint.z;
    return new Vector3(x3, y3, z3);
  },

  //----------------------------------------------------------------------------- 
  rescale: function(newScale) {
    // todo - Change this vector's length to be newScale
    var mag = Math.sqrt((this.x*this.x) + (this.y*this.y) + (this.z*this.z));
    this.x = (this.x/mag);
    this.y = (this.y/mag);
    this.z = (this.z/mag);

    this.x = this.x * newScale;
    this.y = this.y * newScale;
    this.z = this.z * newScale;
    return this;
  },

  //----------------------------------------------------------------------------- 
  angle: function(v1, v2) {
    // todo - calculate the angle in degrees between vectors v1 and v2. Do NOT
    //        change any values on the vectors themselves
    let dotProduct = v1.dot(v2);
    let v1Length = v1.length();
    let v2Length = v2.length();
    let angleRad = Math.acos(dotProduct / (v1Length * v2Length));
    return angleRad * 180 / Math.PI;
  },

  //----------------------------------------------------------------------------- 
  project: function(vectorToProject, otherVector) {
    // todo - return a vector that points in the same direction as "otherVector"
    //        but whose length is the projection of "vectorToProject" onto "otherVector"
    //        NOTE - "vectorToProject" and "otherVector" should NOT be altered (i.e. use clone)
    //        See "Vector Projection Slides" under "Extras" for more info.
    let projection = otherVector.clone().multiplyScalar(vectorToProject.dot(otherVector)/otherVector.lengthSqr());
    return(projection);
  }
};

 

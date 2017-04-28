var VerletBody = function(target) {
    this.target = target;
    this.position = new Phaser.Point(target.position.x, target.position.y);
    this.lastPosition = new Phaser.Point(target.position.x, target.position.y);
    this.forces = new Phaser.Point();
    this.velocity = new Phaser.Point();
    this.gravity = new Phaser.Point();
}

VerletBody.prototype = {
    
    get worldPosition() {
        return this.position;
    },
    
    get friction() {
        return 0;
    },
    
    destroy: function() {},
    
    preUpdate: function() {},
    
    update: function() {
        temp = new Phaser.Point(this.position.x, this.position.y);
        this.position.x = (2 - this.friction) * this.position.x - (1 - this.friction) * this.lastPosition.x + this.forces.x * dt * dt + this.gravity.x * dt * dt;
        this.position.y = (2 - this.friction) * this.position.y - (1 - this.friction) * this.lastPosition.y + this.forces.y * dt * dt + this.gravity.y * dt * dt;
        this.updatePosition();
        this.lastPosition = temp;
        this.velocity = Phaser.Point.subtract(this.position, this.lastPosition);
        this.velocity.x /= dt;
        this.velocity.y /= dt;
        this.forces = new Phaser.Point();
    },
    
    postUpdate: function() {},
    
    setVelocity: function(x,y) {
        this.velocity = new Phaser.Point(x, y);
        this.lastPosition.x = this.position.x - x*dt;
        this.lastPosition.y = this.position.y - y*dt;
    },
    
    addForce: function(x,y) {
        this.forces.x += x;
        this.forces.y += y;
    },
    
    updatePosition: function() {
        this.target.position.x = this.position.x;
        this.target.position.y = this.position.y;
    },
    
    moveBy: function(x,y, preserveVelocity) {
        this.position.x += x;
        this.position.y += y;
        this.updatePosition();
        if (preserveVelocity) {
            this.setVelocity(this.velocity.x,this.velocity.y);
        }
    },
    
    reflectVelocityToDirection: function(dir,multiplier) {
//        multiplier = 1 | multiplier;
        var v_in_dir = this.velocity.x * dir.x + this.velocity.y * dir.y;
        if (v_in_dir >= 0) { return; }
        var vx = this.velocity.x - (1+multiplier)*v_in_dir*dir.x;
        var vy = this.velocity.y - (1+multiplier)*v_in_dir*dir.y;
        this.setVelocity(vx,vy);
    },
    
    reflectForceInDirection: function(x,y,multiplier) {
        multiplier = multiplier | 1;
        var v_in_dir = this.velocity.x * x + this.velocity.y * y;
        if (v_in_dir >= 0) { return; }
        this.addForce((1+multiplier)*v_in_dir*x, (1+multiplier)*v_in_dir*y);
    }
}
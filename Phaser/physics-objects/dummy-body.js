var DummyBody = function(target) {
    this.target = target;
    this.position = new Phaser.Point(target.position.x, target.position.y);
    this.lastPosition = new Phaser.Point(this.position.x, this.position.y);
    this.referencePosition = Phaser.Point.subtract(this.target.worldPosition, this.position);
    this.rotation = target.rotation;
    this.referenceRotation = target.worldRotation;
}

DummyBody.prototype = {
    
    get worldPosition() {
        return Phaser.Point.add(this.referencePosition, this.position);
    },
    
    get worldRotation() {
        return this.referenceRotation + this.rotation;
    },
    
    destroy: function() {},
    
    preUpdate: function() {
        this.referencePosition = Phaser.Point.subtract(this.target.worldPosition, this.position);
        this.referenceRotation = this.target.worldRotation - this.rotation;
    },
    
    update: function() {
        this.target.rotation = this.rotation;
        this.target.position = this.position;
    },
    
    postUpdate: function() {},
    
    moveBy: function(x, y) {
        this.position.x += x;
        this.position.y += y;
    }
}
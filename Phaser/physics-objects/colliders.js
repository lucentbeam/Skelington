var Collision = function(direction, distance) {
    this.direction = direction;
    this.distance = distance;
}

var CircleCollider = function(target, radius) {
    this.radius = radius;
    this.target = target;
    this.callbacks = [];
}

CircleCollider.prototype = {
    type: "circle",
    
    get x() { return this.target.worldPosition.x; },
    get y() { return this.target.worldPosition.y; },
    get center() { return new Phaser.Point(this.x, this.y); },
    
    addCallback: function(target, context) {
        this.callbacks.push([target,context]);
    },
    
    doCallbacks: function(other, collisionData) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i][0].call(this.callbacks[i][1], this, other, collisionData);
        }
    },
    
    collides: function(other) {
        if (other.type === "circle") {
            return this.getCollisionWithCircle(other);
        } else if (other.type === "line") {
            return this.getCollisionWithLine(other);
        }
        return undefined;
    },
    
    getCollisionWithCircle: function(circle) {
        var threshold = circle.radius + this.radius;
        var direction = new Phaser.Point(this.x-circle.x,this.y-circle.y);
        var distance = direction.getMagnitude();
        if (distance < threshold) {
            direction.normalize();
            var collision = new Collision(direction, threshold-distance);
            this.doCallbacks(circle, collision);
            return collision;
        }
        return undefined;
    },
    
    getCollisionWithLine: function(line) {
        var nearestPoint = line.getNearestPoint(this.center);
        
        var separation = Phaser.Point.subtract(this.center, nearestPoint);
        var distance = separation.getMagnitude();
        
        if (distance < this.radius) {
            separation.normalize();
            var collision = new Collision(separation, this.radius-distance);
            this.doCallbacks(line, collision);
            return collision;
        }
        return undefined;
    }
}

var LineCollider = function(target, pt1, pt2) {
    this.target = target;
    this.start = pt1;
    this.end = pt2;
    this.length = Phaser.Point.distance(pt1, pt2);
    this.initialRotation = target.worldRotation;
    this.callbacks = [];
    this.referenceAngle;
    this.referenceX;
    this.referenceY;
    this.updatePoints();
}

LineCollider.prototype = {
    type: "line",
    
    addCallback: function(target, context) {
        this.callbacks.push([target,context]);
    },
    
    doCallbacks: function(other, collisionData) {
        for (var i = 0; i < this.callbacks.length; i++) {
            this.callbacks[i][0].call(this.callbacks[i][1], this, other, collisionData);
        }
    },
    
    updatePoints: function() {
        if (this.target.worldPosition.x == this.referenceX && this.target.worldPosition.y === this.referenceY && this.target.worldRotation === this.referenceAngle) {
            return;
        }
        this.referenceAngle = this.target.worldRotation;
        this.referenceX = this.target.worldPosition.x;
        this.referenceY = this.target.worldPosition.y;
        
        // endpoints
        this.currentStart = new Phaser.Point(this.start.x, this.start.y);
        this.currentStart.rotate(0, 0, this.target.worldRotation-this.initialRotation);
        this.currentStart = Phaser.Point.add(this.currentStart, this.target.worldPosition);
        
        this.currentEnd = new Phaser.Point(this.end.x, this.end.y);
        this.currentEnd.rotate(0, 0, this.target.worldRotation-this.initialRotation);
        this.currentEnd = Phaser.Point.add(this.currentEnd, this.target.worldPosition);
        
        // direction
        this.direction = new Phaser.Point.subtract(this.currentEnd, this.currentStart);
        this.direction.normalize();
        
        // normal
        this.normal = new Phaser.Point(this.direction.x,this.direction.y);
        Phaser.Point.rotate(this.normal, 0, 0, 90, true);
    },
    
    getNearestPoint: function(point) {
        this.updatePoints();
        var vector = Phaser.Point.subtract(point,this.currentStart);
        var projection = this.direction.dot(vector);
        projection = Math.min(Math.max(projection, 0), this.length);
        return Phaser.Point.add(this.currentStart, new Phaser.Point(this.direction.x*projection, this.direction.y*projection));
    }
}
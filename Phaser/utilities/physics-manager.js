function attachCircleBody(target, group, radius)
{
    target.body = new VerletBody(target);
    target.collider = new CircleCollider(target.body, radius);
    Physics.addToGroup(target, group);
}

function attachLineBody(target, group, pt1, pt2)
{
    target.body = new DummyBody(target);
    target.collider = new LineCollider(target.body, pt1, pt2);
    Physics.addToGroup(target, group);
}

var Physics = {
    groups: { },
    
    createGroup: function(name) {
        if (this.groups.hasOwnProperty(name)) {
            console.log("INFO: (create group) physics group "+name+" already exists.");
        } else {
            this.groups[name] = [];
        }
    },
    
    addToGroup: function(target, group) {
        if (!this.groups.hasOwnProperty(group)) {
            console.log("WARNING: (add to group) physics group "+group+" does not exist.");
        } else {
            this.groups[group].push(target);
        }
    },
    
    collideGroups: function(group1, group2, callback) {
        if (!this.groups.hasOwnProperty(group1)) {
            console.log("WARNING: (collide groups) physics group "+group2+" does not exist.");
            return;
        } else if (!this.groups.hasOwnProperty(group2)) {
            console.log("WARNING: (collide groups) physics group "+group2+" does not exist.");
            return;
        }
        if (group1 === group2) {
            this.collideSelfGroup(group1, callback);
            return;
        }
        for (var i = 0; i < this.groups[group1].length; i++) {
            for (var j = 0; j < this.groups[group2].length; j++) {
                var c = this.groups[group1][i].collider.collides(this.groups[group2][j].collider);
                if (c) {
                    callback(this.groups[group1][i], this.groups[group2][j], c);
                }
            }
        }
    },
    
    collideSelfGroup: function(group, callback) {
        for (var i = 0; i < this.groups[group].length; i++) {
            for (var j = i+1; j < this.groups[group].length; j++) {
                var c = this.groups[group][i].collider.collides(this.groups[group][j].collider);
                if (c) {
                    callback(this.groups[group][i], this.groups[group][j], c);
                }
            }
        }
    },
    
    updateGroup: function(group) {
        if (!this.groups.hasOwnProperty(group)) {
            console.log("WARNING: (update) physics group "+group+" does not exist.");
        } else {
            for (var i = 0; i < this.groups[group].length; i++) {
                this.groups[group].body.update();
            }
        }
    }
}
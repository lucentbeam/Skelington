function bezier(pointList, fraction) {
    if (pointList.length === 2) {
        return weightedAverage(pointList[0], pointList[1], fraction);
    } else if (pointList.length >= 2) {
        var newList = []
        for (var i = 0; i < pointList.length-1; i++)
        {
            newList.push(weightedAverage(pointList[i], pointList[i+1], fraction));
        }
        return bezier(newList, fraction);
    }
    console.log("WARNING: Bezier curves need 2 or more points.");
}

function weightedAverage(pt1, pt2, fraction) {
    return new Phaser.Point(pt1.x*(1-fraction) + pt2.x*fraction, pt1.y*(1-fraction) + pt2.y*fraction);
}
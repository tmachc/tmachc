function Vector(e,t){
    this.x=e;
    this.y=t
}
function Petal(e,t,n,r,i,s){
    this.stretchA=e;
    this.stretchB=t;
    this.startAngle=n;
    this.angle=r;
    this.bloom=s;
    this.growFactor=i;
    this.r=1;this.isfinished=false
}
function Bloom(e,t,n,r,i){
    this.p=e;this.r=t;this.c=n;this.pc=r;this.petals=[];this.garden=i;this.init();this.garden.addBloom(this)
}
function Garden(e,t){
    this.blooms=[];
    this.element=t;
    this.ctx=e
}
Vector.prototype={
    rotate:function(e){
        var t=this.x;
        var n=this.y;
        this.x=Math.cos(e)*t-Math.sin(e)*n;
        this.y=Math.sin(e)*t+Math.cos(e)*n;
        return this
    },
    mult:function(e){
        this.x*=e;
        this.y*=e;
        return this
    },
    clone:function(){
        return new Vector(this.x,this.y)
    },
    length:function(){
        return Math.sqrt(this.x*this.x+this.y*this.y)
    },
    subtract:function(e){
        this.x-=e.x;
        this.y-=e.y;
        return this
    },
    set:function(e,t){
        this.x=e;
        this.y=t;
        return this
    }
};
Petal.prototype={
    draw:function(){
        var e=this.bloom.garden.ctx;
        var t,n,r,i;t=(new Vector(0,this.r)).rotate(Garden.degrad(this.startAngle));
        n=t.clone().rotate(Garden.degrad(this.angle));
        r=t.clone().mult(this.stretchA);
        i=n.clone().mult(this.stretchB);
        e.strokeStyle=this.bloom.c;
        e.beginPath();
        e.moveTo(t.x,t.y);
        e.bezierCurveTo(r.x,r.y,i.x,i.y,n.x,n.y);
        e.stroke()},
    render:function(){
        if(this.r<=this.bloom.r){
            this.r+=this.growFactor;this.draw()
        }else{
            this.isfinished=true
        }
    }
};
Bloom.prototype={
    draw:function(){
        var e,t=true;
        this.garden.ctx.save();
        this.garden.ctx.translate(this.p.x,this.p.y);
        for(var n=0;n<this.petals.length;n++){
            e=this.petals[n];
            e.render();
            t*=e.isfinished
        }
        this.garden.ctx.restore();
        if(t==true){
            this.garden.removeBloom(this)
        }
    },
    init:function(){
        var e=360/this.pc;
        var t=Garden.randomInt(0,90);
        for(var n=0;n<this.pc;n++){
            this.petals.push(new Petal(
                Garden.random(Garden.options.petalStretch.min,Garden.options.petalStretch.max),
                Garden.random(Garden.options.petalStretch.min,Garden.options.petalStretch.max),
                t+n*e,
                e,
                Garden.random(Garden.options.growFactor.min,Garden.options.growFactor.max),
                this
            ))
        }
    }
};
Garden.prototype={
    render:function(){
        for(var e=0;e<this.blooms.length;e++){
            this.blooms[e].draw()
        }
    },
    addBloom:function(e){
        this.blooms.push(e)
    },
    removeBloom:function(e){
        var t;
        for(var n=0;n<this.blooms.length;n++){
            t=this.blooms[n];
            if(t===e){
                this.blooms.splice(n,1);
                return this
            }
        }
    },
    createRandomBloom:function(e,t){
        this.createBloom(
            e,
            t,
            Garden.randomInt(Garden.options.bloomRadius.min,Garden.options.bloomRadius.max),
            Garden.randomrgba(Garden.options.color.rmin,Garden.options.color.rmax,Garden.options.color.gmin,Garden.options.color.gmax,Garden.options.color.bmin,Garden.options.color.bmax,Garden.options.color.opacity),
            Garden.randomInt(Garden.options.petalCount.min,Garden.options.petalCount.max))
    },
    createBloom:function(e,t,n,r,i){
        new Bloom(new Vector(e,t),n,r,i,this)
    },
    clear:function(){
        this.blooms=[];
        this.ctx.clearRect(0,0,this.element.width,this.element.height)
    }
};
Garden.options={
    petalCount:{min:8,max:20},
    petalStretch:{min:.1,max:5},
    growFactor:{min:.1,max:1},
    bloomRadius:{min:8,max:12},
    density:15,
    growSpeed:1e3/60,
    color:{rmin:128,rmax:220,gmin:0,gmax:128,bmin:220,bmax:255,opacity:.1},
    tanAngle:60
};
Garden.random=function(e,t){
    return Math.random()*(t-e)+e
};
Garden.randomInt=function(e,t){
    return Math.floor(Math.random()*(t-e+1))+e
};
Garden.circle=2*Math.PI;Garden.degrad=function(e){
    return Garden.circle/360*e
};
Garden.raddeg=function(e){
    return e/Garden.circle*360
};
Garden.rgba=function(e,t,n,r){
    return"rgba("+e+","+t+","+n+","+r+")"
};
Garden.randomrgba=function(e,t,n,r,i,s,o){
    var u=Math.round(Garden.random(e,t));
    var a=Math.round(Garden.random(n,r));
    var f=Math.round(Garden.random(i,s));
    var l=5;
    if(Math.abs(u-a)<=l&&Math.abs(a-f)<=l&&Math.abs(f-u)<=l){
        return Garden.rgba(e,t,n,r,i,s,o)
    }else{
        return Garden.rgba(u,a,f,o)
    }
}
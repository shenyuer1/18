const Main=Vue.component("Main",{
    template:`
    <div class="template">
    <div class="body">
    <div class="left">
    <router-view name="left"></router-view>
</div>
    <div class="right">
        <router-view name="right"></router-view>
</div>
</div>
    </div>
    `
})
const Left=Vue.component("Left",{

    template:`
    <div>
    <ul>
    <li v-for="item in parsedata" class="parent">{{item.title}}
    <ul>
    <li v-for="item1 in item.child" class="child">
    <router-link :to="'#a'+item1.id" >{{item1.title}}</router-link>
</li>
    </ul>
    </li>
</ul>
    </div>
    `,
    data(){
        return {
            menu:[
                {id:1,title:"Global1",pid:0},
                {id:2,title:"Global11",pid:0},
                {id:3,title:"Global11",pid:1},
                {id:4,title:"Global2",pid:1},
                {id:5,title:"Global22",pid:1},
                {id:6,title:"Global22",pid:2},
                {id:7,title:"Global0",pid:2},
                {id:8,title:"Global2",pid:2},
            ]
        }
    },
    computed:{
        parsedata(){
            var arr=[];
            for(var i in this.menu){
                if(this.menu[i].pid==0){
                    var obj=this.menu[i];
                    arr.push(obj);

                }else{
                    for(var j in arr){
                        if(this.menu[i].pid==arr[j].id){
                            if(arr[j].child){
                                arr[j].child.push(this.menu[i]);
                            }else{
                                arr[j].child=[];
                                arr[j].child.push(this.menu[i]);
                            }
                        }
                    }
                }
            }
            return arr;
        }
    },


    methods:{

    },
    created(){
        // fetch('./title.txt').then(function (e) {
        //     return e.json();
        // }).then((e)=>{
        //     this.menu = e;
        // })
        var ajax=new XMLHttpRequest();
        ajax.onload= ()=> {
            this.menu=ajax.responseText;
            console.log(this.menu);
        }
        ajax.open('get','./title.txt');
        ajax.send();
    },
    watch:{
        $route(){
            // console.log(this.$route.hash);
            let num=this.$route.hash.slice(2);

            var pos=document.querySelector("#a"+num).offsetTop-40;
            console.log(num);
            console.log(pos);
            function animate () {
                if (TWEEN.update()) {
                    requestAnimationFrame(animate)
                }
            }
            new TWEEN.Tween({ tweeningNumber: document.querySelector(".right").scrollTop})
                .easing(TWEEN.Easing.Quadratic.Out)
                .to({ tweeningNumber: pos}, 500)
                .onUpdate(function () {
                    document.querySelector(".right").scrollTop = this.tweeningNumber.toFixed(0)
                })
                .start()
            animate()
        }

    }
})
const Right=Vue.component("Right",{
    template:`
    <div class="markdown-body">
    <div v-html="menu"></div>
    </div>
    `,
    data(){
        return {
            menu:`<div id="a3"> <h1>global</h1> </div> <p>这是galbal的内容</p> <div id="a4"><h2>global111</h2> </div> <table> <thead> <tr> <th>属性</th> <th>方法</th> <th>描述</th> </tr> </thead> <tbody> <tr> <td>content1</td> <td>content2</td> <td>content3</td> </tr> </tbody> </table> <div id="a5"> <h2>global222</h2> </div> |属性|方法|描述| |-|-|-| |content1|content2|content3| <div id="a6"> <h1>APL</h1> </div> <p>这是APL的内容</p> <div id="a7"> <h2>API111</h2> </div> <table> <thead> <tr> <th>属性</th> <th>方法</th> <th>描述</th> </tr> </thead> <tbody> <tr> <td>content1</td> <td>content2</td> <td>content3</td> </tr> </tbody> </table> <div id="a8"> <h2>API222</h2> </div> |属性|方法|描述| |-|-|-| |content1|content2|content3|`
        } ;
    },
})
const Quick=Vue.component("Quick",{
    template:`
    <div class="markdown-body">
    快速入门 哈哈哈哈
    </div>
    `,
})
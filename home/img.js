function random_imglink(){
var side1=new Array()


side1[1]="bg/1.jpg"
side1[2]="bg/2.jpg"
side1[3]="bg/3.jpg"

 
 
var ry=Math.floor(Math.random()*side1.length)
if (ry==0)
ry=1
document.write('<img class="side1" id="boxy" src="'+side1[ry]+'" border=0>')
}
random_imglink()

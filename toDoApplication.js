import { LightningElement } from 'lwc';
export default class ToDoApplication extends LightningElement {
    taskname = "";
    taskdate = null;
    incompletetask = [];
    completetask = [];
    changehandler(event) {
        let { name, value } = event.target;
        if (name === "taskname") {
            this.taskname = value;
        } else if (name === "taskdate") {
            this.taskdate = value;
        }
    }
    resetHandler() {
        console.log("in  rest handler");
        this.taskname = "";
        this.taskdate = null;
         console.log("in reshandler"+ this.taskname+"  "+this.taskdate);
    }
    addTaskHandler() {
        console.log("in addd");
        //if end dare is misssing, than populate today date
        if (!this.taskdate) {
             console.log("in  empty date handler");
            this.taskdate = new Date().toISOString().slice(0, 10);
        }
        if (this.validatetask()) {
            console.log("in complete validate task");
            this.incompletetask = [...this.incompletetask, {
                taskname: this.taskname,
                taskdate: this.taskdate
            }];
            this.resetHandler();
            let sortesArray = this.sorttask(this.incompletetask);
            this.incompletetask = [...sortesArray];
            console.log("array completed" , this.incompletetask);
        }

    }
    validatetask() {
        console.log("in validate task");
        let isvalid = true;
        let element = this.template.querySelector(".taskname");
        //cond1=check if taskname is empty
        //cond2=check for taskname duplicate
        if (!this.taskname) {
            isvalid = false;
        } else {
            console.log("in duplicate entry task");
            //if find method wll find item in array it will return task item it will return undefined
            let taskItem = this.incompletetask.find((cuurItem) => 
                cuurItem.taskname === this.taskname &&
                cuurItem.taskdate === this.taskdate);
            if (taskItem) {
                isvalid = false;
                element.setCustomValidity("task is already there ")
            }
            if (isvalid) {
                element.setCustomValidity("");
            }
            element.reportValidity();
            return isvalid;

        }
    }
    sorttask(inputArr) {
         console.log("in  sorted handler");
        let sortedArray = inputArr.sort((a, b) => {
            const dateA = new Date(a.taskdate);
            const dateB = new Date(b.taskdate);
            return dateA - dateB;
        });
         console.log("in  sort handler"+sortedArray);
        return sortedArray;
    }



removalHandler(event){
    //remove the itrm from incopmlete task
    console.log("in remove handler");
    console.log("hi" );
    let index=event.target.name;
    console.log(event.target.name);
    this.incompletetask.splice(index,1);
    console.log("array completed" , this.incompletetask);
     let sortesArray = this.sorttask(this.incompletetask);
            this.incompletetask = [...sortesArray];
            console.log("array completed" , this.incompletetask);



}
completetaskHandler(event){
   //remove the itrm from incopmlete task
     console.log("in complete handler");
let index=event.target.name;
    console.log(index );
   this.refreshData(index);


}
dragStartHandler(event){
    event.dataTransfer.setData("index",event.target.dataset.item);

}
allowDrop(event){
    event.preventDefault();

}
dropElementHandler(event){
    let index =event.dataTransfer.getData("index")
    this.refreshData(index);

}
refreshData(index){
    let removeItem=this.incompletetask.splice(index,1);
    console.log("remove completed" , this.removeItem);
    let sortesArray = this.sorttask(this.incompletetask);
            this.incompletetask = [...sortesArray];
               //add the same entery in complete item
               this.completetask=[...this.completetask,removeItem[0]];


}
}
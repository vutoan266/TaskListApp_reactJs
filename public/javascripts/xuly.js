var list;

var Note = React.createClass({
    delete(){
        $.post("/deleteTask", {idDelete: this.props.id}, function(data){
            list.setState({mang:data});
        });
    },
    edit(){
        this.setState({onEdit:true});
        
    },
    save(){
        var note = this;
        $.post("/updateTask", {idUpdate: this.props.id, statusUpdate: this.val}, function(data){
            list.setState({mang:data});
            note.setState({onEdit:false});
            
        });
    },
    cancel(){
        this.setState({onEdit:false});
    },
    getInitialState(){
        return {onEdit:false}
    },
    handleChange(e){
        this.val = (e.target.value);
    },
    render: function(){
        if(this.state.onEdit){
            return (<div className="div-note"> 
            <h1 id="taskname">{this.props.children.taskName}</h1>
            <select ref="selected" value={this.props.children.status} onChange={this.handleChange}>
                <option value="1">Hoàn thành</option>
                <option value="0">Chưa hoàn thành</option>
            </select>
            <br/>
            <button onClick={this.save}>Lưu</button>
            <button onClick={this.cancel}>Hủy</button>
            </div>)
        } else{
            return (<div className="div-note"> 
            <h1 id="taskname">{this.props.children.taskName}</h1>
            <p id="status">{this.props.children.status == "1"?"Hoàn thành":"Chưa hoàn thành"}</p>

            <button onClick={this.edit}>Sửa</button>
            <button onClick={this.delete}>Xóa</button>            
            </div>)
        }
        
    }
});

function addDiv(){
    ReactDOM.render(<InputDiv/>, document.getElementById("div-add"));
}
var List = React.createClass({
    getInitialState(){
        list = this;
        return{mang: []}
    },
    render:function(){
        return (
            <div className='div-list'>  
                <h1 id="tile">TASK LIST APP</h1>              
                <button onClick={addDiv}>+</button>
                {
                this.state.mang.map(function(task, index){
                    return <Note key={index} id={index}>{task}</Note>
                })
                }
                <div id="div-add"></div>
            </div>
        );
    },
    componentDidMount(){
        var that = this;
        $.get("/getTasks", function(data){
            list.setState({
                mang:data
            });
        });
    }
});

var InputDiv = React.createClass({
    
    send(){
        var newTask = {taskName:this.refs.txt.value, status:this.val};
        $.post('/addTask', {task:newTask}, function(data){
            list.setState({mang : data});
        });
        ReactDOM.unmountComponentAtNode(document.getElementById('div-add'));
    },
    handleChange(e){
        this.val = (e.target.value);
    },
    render(){
        this.val = false;
        return <div>
            <input type ="text" ref="txt" placeHolder="Enter here.."/>
            <br/>
            <select ref="selected" onChange={this.handleChange}>
                <option value="1">Hoàn thành</option>
                <option value="0" selected="selected">Chưa hoàn thành</option>
            </select>
            <br/>
            <button onClick={this.send}>Gửi</button>
        </div>
    }
});

ReactDOM.render(
    <div>        
        <List/>
    </div>    
    , 
    document.getElementById("root")
);
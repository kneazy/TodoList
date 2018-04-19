import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {todo: "",
                  list: [],
                  show: "All",
                  count: 0
                  };
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handelListSort = this.handelListSort.bind(this);
    this.allHandleComplet = this.allHandleComplet.bind(this);
    this.handleClearCopmleted = this.handleClearCopmleted.bind(this);
  }


  handleChange(e){
    this.setState({
      todo: e.target.value
    });
  }
  handleSubmit(e){
    const task = {
      name: this.state.todo,
      complet: false
    }
    if(task.name.length){
      const newList = this.state.list.concat(task);
        this.setState({
          todo: "",
          list: newList
        });
    }
    e.preventDefault();
  }
  handleClick(i){
    const deleteItems = [];
    this.state.list.forEach((item, j) =>{
      if(j !== i){
        deleteItems.push(item[j])
      }
    })
    this.setState({
      list: deleteItems
    });  
  }
  handleCheck(i, e){
    const newCheckList= this.state.list.map((item, j) => {
      if(i === j ){
          return {
            name: item.name,
            complet: e.target.checked
          }
      }
      return item;
    })
    this.setState({
      list: newCheckList
    });
  }
  buttonRender(){
    const buttonArray = ['All', 'Active', 'Complet'];
    return(
      buttonArray.map((item, i) => {
        return(
          <button key={i} onClick={this.handelListSort} value={item}>{item}</button>
        );
      })
    );
  }
  handelListSort(e){
    this.setState({
      show: e.target.value
    });
  }
  getFiltredList(){
    let filtred = [];
    this.state.list.forEach((item, i, array) => {
      if(this.state.show === "Active"){
        if(array[i].complet === false){
          filtred.push(array[i])
        }
      }
      else if(this.state.show === "Complet"){
        if(array[i].complet === true){
          filtred.push(array[i])
        }
      } else{
          filtred.push(array[i])
        }
    })
    return (filtred);
  }
  allHandleComplet(){
    const allComplet = this.state.list.map((item) => {

          return {
            name: item.name,
            complet: true
          }
    })
    this.setState({
      list: allComplet
    });
  }
  handleClearCopmleted(e){
    const ClearCopmleted = [];
    this.state.list.forEach((item, i) => {
      if(item.complet === false){
         ClearCopmleted.push(item)
      }
    })
    this.setState({
      list: ClearCopmleted
    });
  }
  leftCount(){
    let count = 0;
    this.state.list.forEach((item, i) => {
          if(item.complet !== true){
            count +=1; 
          }
    });
    return  count;
  }
  getList(){
    const filtredList = this.getFiltredList();
    return (
      filtredList.map((item, i) => {
        return (
          <div key={i} className="list_todo" >
            <input  checked={item.complet} onChange={this.handleCheck.bind(this, i)} type ="checkBox"/>
            {item.complet ? <li className="list_line-through">{item.name}</li>:<li> {item.name}</li>}
            <button className="button_style" onClick={this.handleClick.bind(this, i)}></button>
          </div>
        );                                 
      })
    );
  }
  render() {
    
    const list = this.getList();
    const buttonsRender = this.buttonRender();
    const leftCount = this.leftCount();
   
    
    return (
      <div className="wrapper">
        <form onSubmit={this.handleSubmit}>
          <a className="all-completed" onClick={this.allHandleComplet}> </a>
          <input type="text"  value={this.state.todo} onChange={this.handleChange} className="imputStyle" placeholder="What needs to be done?"/>
          <input type="submit"  value="Submit" className ="buttonStyle"/>
        </form>
          <div className="button-container">
            {buttonsRender}  
          </div>
        <ul>
          {list}
        </ul>
        <div>{leftCount} item left</div>
        {this.state.list.length ? <a className="clear-link" onClick={this.handleClearCopmleted}>Clear completed</a>: false}
      </div>
    );
  }
}

export default App;

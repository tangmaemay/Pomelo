'use strict';

const React = require('react');
const parse = require('html-react-parser');
const Button = require('react-bootstrap/Button') 

class View extends React.Component{
    constructor(props){
        super(props)
        this.page = 1

        this.listTable = this.listTable.bind(this)
    }

    listTable = () => {
        const repos = this.props.repos
        let i = 0
        let html = ""
        repos.map(repo => {
            if(i==0) html += "<tr>"
            html += "<td>"+repo.name+"</td>"
            i++
            if(i>9) { 
                i=0
                html += "</tr>"
            }
        })
        return parse(html)
    }

    render(){
        console.log(this.props.link)
        return(
            <div id="root">
                <table>
                    <tbody>
                        {this.listTable()}
                    </tbody>
                </table>
                <br/>

                {this.props.link.first !== "/search?page=" &&
                    <div>
                        <Button href={this.props.link.first}>first</Button><br/>
                    </div>
                }
                {this.props.link.prev !== "/search?page=" &&
                    <div>
                        <Button href={this.props.link.prev}>prev</Button><br/>
                    </div>
                }
                {this.props.link.next !== "/search?page=" &&
                    <div>
                        <Button href={this.props.link.next}>next</Button><br/>
                    </div>
                }
                {this.props.link.last !== "/search?page=" &&
                    <div>
                        <Button href={this.props.link.last}>last</Button><br/>
                    </div>
                }
                you are on page {this.props.page}
            </div>
        )
    }
}

module.exports = View
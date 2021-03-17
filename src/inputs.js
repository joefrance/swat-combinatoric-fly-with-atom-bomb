import React, { Component } from 'react'
import logo from './logo.svg';

const styleListInput = {
  width: '500px'
};

class Inputs extends Component {
   state = {
      listItems: 'John, Paul, Ringo, George',
      listIndices: [],
      n: 2,
      combinatoricItems: []
   }

    dec2bin(dec, bits) {
        var padding = '0'.repeat(bits)
        return this.right(padding + (dec >>> 0).toString(2), bits);
    }

    countOccurance(str, char) {
        return (str.match(new RegExp(char, "g")) || []).length
    }

    right(str, chr)
    {
        return str.slice(str.length-chr,str.length);
    }

    randomArray = (length, max) => [...new Array(length)]
        .map(() => Math.round(Math.random() * max));
    onSwatTheFlyClick = () => {
        this.state.combinatoricItems = [];
        this.state.listIndices = [];
        //this.props.cancelWeldUnit(this.props.history);
        console.log(`Swatted the fly: ${this.state.listItems}`)
        var splitItems = this.state.listItems.split(',');
        for(var ix=0; ix < splitItems.length; ix++) {
            console.log(`${splitItems[ix].trim()}`)
            this.state.listIndices.push({
                label: splitItems[ix].trim(),
                index: Math.pow(2, ix)
            })
        }
        console.log(this.state.listIndices);

        var nInt = parseInt(this.state.n);
        var purmutations = 0;
        var totalCombinations = Math.pow(splitItems.length, 2)
        console.log(`totalCombinations: ${totalCombinations}`)
        for(var ix=0; ix < totalCombinations; ix++) {
            var combinatoricItems = [];
            for(var cx=0; cx < this.state.listIndices.length; cx++) {
                if(this.state.listIndices[cx].index & ix) {
                    combinatoricItems.push(`${this.state.listIndices[cx].label}.${this.state.listIndices[cx].index}`)
                }
            }
            var binaryString = this.dec2bin(ix, splitItems.length)
            var occurances = this.countOccurance(binaryString, '1');
            if(occurances === nInt) {
                purmutations++;
                console.log(`Search this since: 1s in ${binaryString} => ${occurances}`);
                this.state.combinatoricItems.push({
                    index: purmutations,
                    combinatoric: combinatoricItems.join(','),
                    binaryString: binaryString
                })
            }
        }

        console.log(`purmutations: ${purmutations}`)

        this.setState({ state: this.state });
    }

    onChange = e => this.setState({[e.target.name]: e.target.value});

    getAllCombinations() {

        if (this.state.combinatoricItems) {
          return this.state.combinatoricItems.map((item, index) => 
             (
              <tr key={index}>
                <td>{item.index}</td>
                <td>{item.combinatoric}</td>
                <td>{item.binaryString}</td>
              </tr>
             )
          );
        }
    
        return null;
    }

   render() {
      return (
        <div className="container">
            <p>
                Not clear if each value in the list must only appear once.<br />
                So A,A could show in list as a combinatoric of 'A.1,A.2'<br />
                Looks like my <a target="_blank" href="https://en.wikipedia.org/wiki/Endianness">Endianness</a> is backward from what I intended.<br />
                It's 12:50 AM. If you want it fixed send a PR. I'm going to bed!
            </p>
            <div className="row">
              <div className="col-md-12">
                <img src={logo} className="App-logo" alt="logo" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <span>List: </span>
                <input 
                  name="listItems" 
                  type="text"
                  style={styleListInput}
                  value={this.state.listItems}
                  onChange={this.onChange}
                  className="form-control"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <span>n: </span>
                <input 
                  name="n" 
                  type="text" 
                  value={this.state.n} 
                  onChange={this.onChange} 
                  className="form-control"
                />
              </div>
            </div>

            <div className="row mt-3">       

              <div className="col-md-2">
                <input 
                  type="button" 
                  name="swatTheFly" 
                  value="swat-combinatoric-fly-with-atom-bomb" 
                  className="btn btn-secondary"
                  onClick={this.onSwatTheFlyClick}
                />
              </div>
              
            </div>

            <div className="row">
              <div className="col-md-12">
                <table width="100%" border="1" className="table table-striped table-bordered">
                    <tbody>
                        {/* <tr>
                        <td>
                            <Link to="/weld-unit-edit">Add New Weld Unit</Link>
                        </td>
                        </tr> */}
                        <tr>
                        <td>#</td>
                        <td>combinatoric</td>
                        <td>bit mask</td>
                        </tr>
                        {this.getAllCombinations()}
                    </tbody>
                </table>
              </div>
            </div>

        </div>
      )
   }
}

export default Inputs

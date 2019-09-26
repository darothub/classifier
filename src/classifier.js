const immutable = require('../fixtures/inputs/input')
const edge = require('../fixtures/inputs/edge-input')
/**
 * This is the entry point to the program
 *
 * @param {any} input Array of student objects
 */


function classifier(input) {
    // console.log(input)
    // let returnedInput = []
    let newInput = JSON.parse(JSON.stringify(input));

    let exampleOutput = {

    }

    
    if (!Array.isArray(newInput)) {

        throw new Error("invalid")
    }
    if (newInput.length < 1) {
        exampleOutput = { noOfGroups: 0 }
    }
    function compare(a, b) {
        const{age:ageA, regNo:regNoA} = a
        const{age:ageB, regNo:regNoB} = b
        // const ageA = a.age
        // const ageB = b.age
        let comparison = 0;
        if (ageA > ageB) {
            comparison = 1;
        } else if (ageA < ageB) {
            comparison = -1;
        }
        return comparison
    }

    const ages = newInput.map(function (each) {
        let datDob = new Date(each.dob).getFullYear()
        return each.age = new Date().getFullYear() - datDob
    })

    sortedInput = newInput.sort(compare)
    // console.log(sortedInput)
    const getMember = (arg) => {
        let memArray = []
        // console.log(arg)
        if (arg.length == 1) {
            return arg
        }
        let i = 0;
        let j = 1;
        // console.log(arg)
        // console.log(arg.length)
        while (i <= arg.length) {
            
            while (j < 3) {
                //  console.log(arg[j])
                if (arg[j]){
                    if ((arg[j].age - arg[i].age) <= 5) {

                        memArray.push(arg[j])
                    }
                }

                j++
            }
            
            memArray.push(arg[i])
            i++

            return memArray
        }

    }

    let i = 0;
    // console.log(sortedInput)

    while (sortedInput.length >= 1) {
        // console.log(sortedInput)
        let memberss = getMember(sortedInput)
        memberss = memberss.sort(compare)
        // let memRegSort = memberss.sort((a, b) => (a.regNo > b.regNo) ? 1 : -1) 
        memberss = memberss.sort((a, b) => (a.age > b.age) ? 1 : (a.age === b.age) ? ((a.regNo > b.regNo) ? 1 : -1) : -1)
        // return memberss
        const oldest = memberss.map(item => item.age).reduce((a, b) => Math.max(a, b))
        const sumAge = memberss.map(item => item.age).reduce((total, curVal) => total + curVal)
        const regNo = memberss.map(item => parseInt(item.regNo))
        exampleOutput[`noOfGroups`] = i + 1
        exampleOutput[`group${i + 1}`] = {}
        exampleOutput[`group${i + 1}`]['members'] = memberss
        exampleOutput[`group${i + 1}`].oldest = oldest
        exampleOutput[`group${i + 1}`].sum = sumAge

        exampleOutput[`group${i + 1}`].regNos = regNo.sort((a, b) => a > b? 1 : -1)
        sortedInput = sortedInput.slice(memberss.length, sortedInput.length + 1)
        // console.log(sortedInput)
        // sortedInput.splice(0, memberss.length)
        // console.log(exampleOutput[`group${i + 1}`]['members'])


        i++
    }

    // console.log(exampleOutput)
    return exampleOutput
    // console.log (getMember(sortedInput))

}
const input = [
    {
        name: 'Hendrick',
        dob: '1853-07-18T00:00:00.000Z',
        regNo: '041',
    }

]
Object.freeze(edge)
const out = classifier(edge)
console.log(out)

module.exports = classifier;

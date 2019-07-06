// import React, { Component } from 'react';
// import {connect} from 'react-redux'
// import {Card, Input, Form, Header, Button,TextArea } from 'semantic-ui-react'
// // Action
// import {addIssue, fetchIssues} from '../../redux/actions/issue'

// export class AddIssueModal extends Component {
//     state = {
//         name: '',
//         description: ''
//     }

//     // handleAddIssue = async () => {
//     //     const {user, project, addIssue, fetchIssues} = this.props
//     //     const data = {
//     //         name: 'new issue',
//     //         description: 'testing adding issue',
//     //         active: 'closed',
//     //         userId: user._id,
//     //         userName: user.username
//     //     }
//     //     await addIssue(project._id, data);
//     //     await fetchIssues(project._id)
//     // }

//     handleSubmit = async (e) => {
//         const {user, project, addIssue, fetchIssues, handleOpenModal} = this.props
//         // const data = {
//         //     name: 'new issue',
//         //     description: 'testing adding issue',
//         //     active: 'closed',
//         //     userId: user._id,
//         //     userName: user.username
//         // }
//         const data = this.state;
//         console.log('project:', project)
//         data.userId = user._id;
//         data.userName = user.username
//         await addIssue(project._id, data);
//         await fetchIssues(project._id)
        
//         handleOpenModal()
//     }

//     handleDescriptionChange = (e) => {
//         this.setState({description: e.target.value})
//     }

//     handleNameInput = (e) => {
//         this.setState({name: e.target.value})
//     }

//     render() {
//         const {name, description} = this.state

//         return (
//             <div className='add-project-modal-container'>
//                 <Card className='add-project-modal-style flex-justify-center flex-align-items-center'>
//                     <Header size='medium'>Creating New Issue</Header>
//                     <div>Project Name</div>
//                     <Input value={name} onChange={this.handleNameInput} placeholder='Name' />
//                     <div>Description</div>
//                     <Form onChange={this.handleDescriptionChange}>
//                         <TextArea value={description}  placeholder='Tell us more' style={{ minHeight: 100 }} />
//                     </Form>
//                     <div style={{marginTop: '20px'}}>
//                     <Button onClick={this.handleSubmit}>Submit</Button>
//                     <Button onClick={this.props.handleOpenModal}>Close</Button>
//                     </div>
//                 </Card>
//             </div>
//         )
//     }
// }


// export default connect(null, {addIssue, fetchIssues})(AddIssueModal)

import React, { Component } from 'react'
import {connect} from 'react-redux';
import {Card, Input, Form, Header, Button,TextArea } from 'semantic-ui-react'

import {addIssue,fetchIssues} from '../../redux/actions/issue'

export class AddIssueModal extends Component {
        state = {
        name: '',
        description: ''
    }

    // handleAddIssue = async () => {
    //     const {user, project, addIssue, fetchIssues} = this.props
    //     const data = {
    //         name: 'new issue',
    //         description: 'testing adding issue',
    //         active: 'closed',
    //         userId: user._id,
    //         userName: user.username
    //     }
    //     await addIssue(project._id, data);
    //     await fetchIssues(project._id)
    // }

    handleSubmit = async (e) => {
        const {user, project, addIssue, fetchIssues, handleOpenModal} = this.props
        // const data = {
        //     name: 'new issue',
        //     description: 'testing adding issue',
        //     active: 'closed',
        //     userId: user._id,
        //     userName: user.username
        // }
        const data = this.state;
        console.log('project:', project)
        data.userId = user._id;
        data.active = 'active'
        data.userName = user.username
        await addIssue(project._id, data);
        await fetchIssues(project._id)
        
        handleOpenModal()
    }

    handleDescriptionChange = (e) => {
        this.setState({description: e.target.value})
    }

    handleNameInput = (e) => {
        this.setState({name: e.target.value})
    }

    render() {
        const {name, description} = this.state

        return (
            <div className='add-project-modal-container'>
                <Card className='add-project-modal-style flex-justify-center flex-align-items-center'>
                    <Header size='medium'>Creating New Issue</Header>
                    <div>Project Name</div>
                    <Input value={name} onChange={this.handleNameInput} placeholder='Name' />
                    <div>Description</div>
                    <Form onChange={this.handleDescriptionChange}>
                        <TextArea value={description}  placeholder='Tell us more' style={{ minHeight: 100 }} />
                    </Form>
                    <div style={{marginTop: '20px'}}>
                    <Button onClick={this.handleSubmit}>Submit</Button>
                    <Button onClick={this.props.handleOpenModal}>Close</Button>
                    </div>
                </Card>
            </div>
        )
    }
}

export default connect(null, {addIssue, fetchIssues})(AddIssueModal)


import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../../../Layouts/Manage';
import { getFormData } from '../../../../helpers/form';
import {linkCreate} from '../../../../actions/LinkActions'
import {connect} from 'react-redux';

const Create = ({link, linkCreate}) =>{

    const submitHandler = (e) => {
        e.preventDefault();
        const data = getFormData(e);
        console.log('***Create.submitHandler.data',data)
        linkCreate(data);

    };

    // if(link){
    //   return  <Redirect to="/managelinks" />
    // }

    return (
        <Layout>
            <h1>Create Link</h1>
            <div className="container h-100 pt-5">
                <form onSubmit={submitHandler}>
                    <div className="form-group">
                        <label >Label</label>
                        <input type="text" className="form-control" name="label"/>
                    </div>
                    <div className="form-group">
                        <label >url</label>
                        <input type="text" className="form-control" name="url"/>
                    </div>
                    <div className="form-group form-check">
                        <label className="form--label">Password Confirmation
                            <input type="checkbox"name="isSocial"/>
                            <span className="form-check-sign"></span>
                            Is Social
                        </label>
                    </div>
                        <div>
                            <button className="btn btn-primary btn-round">Submit</button>
                        </div>
                    </form>
                    <div className="container text-center fixed-bottom pb-5">
                        <div className="text-muted">Already have an Account?</div>
                        <Link to ='/sign-in'>Sign Up</Link>
                    </div>
            </div>
        </Layout>
    )
    
}
const mapStateToProps = (state) => {
    return {account: state.account.account};
};


export default connect(mapStateToProps, {linkCreate})(Create);
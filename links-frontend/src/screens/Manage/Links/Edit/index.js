
import React, { useEffect } from 'react';
import {useParams} from 'react-router-dom';
import Layout from '../../../Layouts/Manage';
import {connect} from 'react-redux';
import {linkGet, linkUpdate} from '../../../../actions/LinkActions';
import FormGroup from '../../../../components/FormGroup';
import FormCheck from '../../../../components/FormCheck';
import { getFormData } from '../../../../helpers/form';

const Edit = ({link, linkGet, linkUpdate}) =>{

    const {id} = useParams();
    useEffect(()=>
    {
        linkGet(id);
    }, [id,linkGet]);

    const submitHandler = (e) => {
        e.preventDefault();
        const data = getFormData(e);
        linkUpdate(id, data)
    };

    return (
        <Layout>
            <h1>Edit Link</h1>
            <div>
                <form onSubmit={submitHandler}>
                    <FormGroup label="Label" name="label" data={link} type="text"/>
                    <FormGroup label="url" name="url" data={link} type="text"/>
                    <FormCheck label="Is Social" name="isSocial" data={link} type="text"/>
                    <div>
                        <button className="btn btn-primary btn-round">Submit</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
    
}

const mapStateToProps = (state) => {
    return { links: state.link.link};
};

export default connect(mapStateToProps,{linkGet, linkUpdate})(Edit);
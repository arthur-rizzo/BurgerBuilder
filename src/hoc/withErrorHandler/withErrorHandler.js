import React, {Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';

const withErrorhandler = (WrapperComponent, axios) =>
{
    return class extends Component {

        state = {
            error: null
        };    

        componentWillMount() {
            
            this.requestInterceptor = axios.interceptors.request.use(req => {
                this.setState({error:null});
                return req;
                });

            this.responseInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({ error: error});
            });

        }

        componentWillUnmount(){
            
            axios.interceptors.request.eject(this.requestInterceptor);
            axios.interceptors.response.eject(this.responseInterceptor);
        }

        render() {           
            return (
                <React.Fragment>
                    <Modal 
                        show={this.state.error !== null}
                        modalClosed={this.errorConfirmedHandler}>
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrapperComponent {...this.props} />
                </React.Fragment>);
        }

        errorConfirmedHandler = () => {
            this.setState({ error:null });
        }
    }
};

export default withErrorhandler;

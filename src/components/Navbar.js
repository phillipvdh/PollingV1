import { connect } from 'react-redux'
import Links from './Links'
import User from './User'

const Navbar = (props) => {
    return (
        <div className=' container-fluid navbar py-4'>
            <Links />
            {!props.loading && <User />}{' '}
        </div>
    )
}

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null
})

export default connect(mapStateToProps)(Navbar)
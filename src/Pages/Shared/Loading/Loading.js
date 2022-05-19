import React from 'react';

const Loading = () => {
    return (
    <div class="d-flex justify-content-center align-items-center">
        <button class="btn btn-primary" type="button" disabled>
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                Loading...
            </button>
        </div>
    );
};

export default Loading;
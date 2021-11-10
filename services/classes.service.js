const axiosBase = require('../config/axios.config');

exports.createClass = (classData, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: '/class',
            method: 'post',
            data: classData,
            headers: {
                userId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.getOneClass = (classId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/getOneClass/${classId}`,
            method: 'get',
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.inviteMember = (classId, userId, adminId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/members/invite/${classId}`,
            method: 'post',
            data: {
                members: [userId],
            },
            headers: {
                userId: adminId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.unInviteMember = (classId, userId, adminId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/members/invite/${classId}`,
            method: 'delete',
            data: {
                members: [userId],
            },
            headers: {
                userId: adminId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.acceptRequestJoinClass = (classId, requestId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/request/accept/${classId}`,
            method: 'put',
            data: {
                requestId,
            },
            headers: {
                userId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.rejectRequestJoinClass = (classId, requestId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/request/reject/${classId}`,
            method: 'delete',
            data: {
                requestId,
            },
            headers: {
                userId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.deleteMember = (classId, userId, joinedId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/members/${classId}`,
            method: 'delete',
            data: {
                joinedId,
            },
            headers: {
                userId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.deleteClass = (classId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/class/${classId}`,
            method: 'delete',
            headers: {
                userId,
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

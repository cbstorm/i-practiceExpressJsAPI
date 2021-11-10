const axiosBase = require('../config/axios.config');
const { getUserProfile } = require('./profile.service');

exports.getClassesOfUser = (userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/user/${userId}`,
            method: 'get',
        })
            .then(async (response) => {
                const classList = response.data.data;
                if (classList.length > 0) {
                    const classListMappedAdminProfile = await Promise.all(
                        classList.map(async (classItem) => {
                            const adminProfile = await getUserProfile(
                                classItem.adminUser
                            );
                            classItem.adminUser = adminProfile;
                            return classItem;
                        })
                    );
                }
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.acceptJoinClass = (classId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/user/accept/${classId}`,
            method: 'put',
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

exports.rejectJoinClass = (classId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/user/reject/${classId}`,
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

exports.leaveClass = (classId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/user/leave/${classId}`,
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

exports.sendOrDestroyRequestJoinClass = (classId, userId) => {
    return new Promise((resolve, reject) => {
        axiosBase({
            url: `/user/request-destroy/${classId}`,
            method: 'put',
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

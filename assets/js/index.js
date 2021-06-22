$(function() {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo();

    var layer = layui.layer;
    //点击退出按钮实现用户退出功能
    $('#btnLogout').on('click', function() {

        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function(index) {
            //do something
            // 1.清除本地存储中的 token值
            localStorage.removeItem('token');
            // 2.页面跳转到登录界面
            location.href = '/login.html';

            // 关闭 comfirm 询问框 
            layer.close(index);
        });
    })
})

// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }

            // 调用 renderAvatar 渲染用户基本信息
            renderAvatar(res.data);
        },

        //jquery中的ajax,不论成功失败，最终都会调用 complete回调函数
        // complete: function(res) {
        //     // 在 complete回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         //    1.强制清空本地存储中的token
        //         localStorage.removeItem('token');
        //         // 2.强制页面跳转到登录页面
        //         location.href = '/login.html';
        //     }
        // }
    })
}

//渲染用户信息
function renderAvatar(user) {
    // 1.获取用户的头像
    var name = user.nickname || user.username;
    // 2.设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
    // 3.按需渲染用户的头像
    if (user.user_pic !== null) {
        // 3.1渲染图片头像
        $('.layui-nav-img').attr('src', 'user.user_pic').show();
        $('.text-avatar').hide();
    } else {
        // 3.2 渲染文本头像
        $('.layui-nav-img').hide();
        var first = name[0].toUpperCase();
        $('.text-avatar').html(first).show();
    }
}
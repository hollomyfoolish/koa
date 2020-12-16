const excludes = /^(\/login|\/code)([?#].*)?$/;
const auth = async (ctx, next) => {
    if(excludes.test(ctx.request.url)){
        return next();
    }
    if(ctx.session?.token){
        return next();
    }
    ctx.response.redirect('/login');
};

export {auth};
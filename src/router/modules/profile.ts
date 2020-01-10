import Authentication from "@/views/UserProfile/Authentication/Authentication.vue";
import AuthCertificate from "@/views/UserProfile/Authentication/AuthCertificate/AuthCertificate.vue";
import AuthDetail from "@/views/UserProfile/Authentication/AuthDetail/AuthDetail.vue";
import AuthFace from "@/views/UserProfile/Authentication/AuthFace/AuthFace.vue";
import DCPersonal from "@/views/UserProfile/DigitalCertificate/DCPersonal/DCPersonal.vue";
import ProtocolPrivacy from "@/views/UserProfile/DigitalCertificate/ProtocolPrivacy/ProtocolPrivacy.vue";
import ProtocolPlatform from "@/views/UserProfile/DigitalCertificate/ProtocolPlatform/ProtocolPlatform.vue";
import ProtocolCFCA from "@/views/UserProfile/DigitalCertificate/PotocolCFCA/ProtocolCFCA.vue";
import DCOrganization from "@/views/UserProfile/DigitalCertificate/DCOrganization/DCOrganization.vue";

const profileRouter = [
    {
        path: '/authentication',
        name: 'authentication',
        component: Authentication,
        redirect: 'authCertificate',
        children: [
            {
                path: '/authCertificate',
                name: 'certificate',
                component: AuthCertificate,
                meta: { title: '实名认证',navShow:true  }
            },
            {
                path: '/authDetail',
                name: 'detail',
                component: AuthDetail,
                meta: { title: '实名认证',navShow:true  }
            },
            {
                path: '/authFace',
                name: 'face',
                component: AuthFace,
                meta: { title: '实名认证',navShow:true  }
            }
        ]
    },
    {
        path: '/dcPersonal',
        name: 'dcPersonal',
        component: DCPersonal,
        meta: { title: '数字证书',navShow:true }
    },
    {
        path: '/dcOrganization',
        name: 'dcOrganization',
        component: DCOrganization,
        meta: { title: '数字证书',navShow:true }
    },
    {
        path: '/protocolPrivacy',
        name: 'protocolPrivacy',
        component: ProtocolPrivacy,
        meta: { title: '隐私声明',navShow:true }
    },
    {
        path: '/protocolPlatform',
        name: 'protocolPlatform',
        component: ProtocolPlatform,
        meta: { title: '隐私声明',navShow:true }
    },
    {
        path: '/protocolCFCA',
        name: 'protocolCFCA',
        component: ProtocolCFCA,
        meta: { title: '隐私声明',navShow:true }
    }
]

export default profileRouter;

import { useTranslation } from "react-i18next";
import useThemifiedComponent from '../../app/hooks/useThemifiedComponent';
import { createIcon, Icon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedCategory, setGender, setLetter } from '../filter/filterSlice';
import { loadAllPetnames, setNamesList } from './viewSlice';
import { toggleLoader } from '../../app/commonSlice';

const NoResultImage = createIcon({
    displayName: 'NoResultImage',
    viewBox: '0 0 48 77',
    path: (<svg width="48" height="77" viewBox="0 0 48 77" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35 22.0015C35 21.2058 34.6839 20.4428 34.1213 19.8801C33.5587 19.3175 32.7956 19.0015 32 19.0015C31.2044 19.0015 30.4413 19.3175 29.8787 19.8801C29.3161 20.4428 29 21.2058 29 22.0015" stroke="#E81C24" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 22.0015C18 21.2058 17.6839 20.4428 17.1213 19.8801C16.5587 19.3175 15.7956 19.0015 15 19.0015C14.2044 19.0015 13.4413 19.3175 12.8787 19.8801C12.3161 20.4428 12 21.2058 12 22.0015" stroke="#E81C24" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 41.0015V49.0015C18 52.3152 20.6863 55.0015 24 55.0015V55.0015C27.3137 55.0015 30 52.3152 30 49.0015V41.0015" stroke="#E81C24" strokeWidth="2.5"/>
    <path d="M24.0453 36.23L19.6131 40.0061C16.9177 42.3025 12.9479 42.2809 10.2777 39.9554V39.9554C7.77207 37.7733 7.09919 34.1531 8.65337 31.2164L8.7762 30.9843M24.0453 36.23L21.3917 31.4801C20.2706 29.4735 21.7212 27.0015 24.0198 27.0015V27.0015C26.3074 27.0015 27.7591 29.4523 26.6598 31.4585L24.0453 36.23ZM24.0453 36.23L28.3113 39.9044C31.001 42.2211 35.0167 42.0922 37.5523 39.6079V39.6079C39.619 37.5831 40.1863 34.4762 38.9687 31.8516L38.5212 30.8872" stroke="#E81C24" strokeWidth="2.5" strokeLinecap="round"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12 34.0015C12.5523 34.0015 13 33.5537 13 33.0015C13 32.4492 12.5523 32.0015 12 32.0015C11.4477 32.0015 11 32.4492 11 33.0015C11 33.5537 11.4477 34.0015 12 34.0015ZM16 34.0015C16.5523 34.0015 17 33.5537 17 33.0015C17 32.4492 16.5523 32.0015 16 32.0015C15.4477 32.0015 15 32.4492 15 33.0015C15 33.5537 15.4477 34.0015 16 34.0015ZM15 35.0015C15 35.5537 14.5523 36.0015 14 36.0015C13.4477 36.0015 13 35.5537 13 35.0015C13 34.4492 13.4477 34.0015 14 34.0015C14.5523 34.0015 15 34.4492 15 35.0015ZM31 34.0015C31.5523 34.0015 32 33.5537 32 33.0015C32 32.4492 31.5523 32.0015 31 32.0015C30.4477 32.0015 30 32.4492 30 33.0015C30 33.5537 30.4477 34.0015 31 34.0015ZM35 34.0015C35.5523 34.0015 36 33.5537 36 33.0015C36 32.4492 35.5523 32.0015 35 32.0015C34.4477 32.0015 34 32.4492 34 33.0015C34 33.5537 34.4477 34.0015 35 34.0015ZM34 35.0015C34 35.5537 33.5523 36.0015 33 36.0015C32.4477 36.0015 32 35.5537 32 35.0015C32 34.4492 32.4477 34.0015 33 34.0015C33.5523 34.0015 34 34.4492 34 35.0015Z" fill="#E81C24"/>
    <path d="M24 36.0015V47.0015" stroke="#E81C24" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M46.75 1.25265C45.4404 1.2608 44.1863 1.29403 43.0013 1.42948C41.4489 1.60694 40.1037 1.95201 38.9952 2.58548C36.9121 3.77586 35.25 6.24011 35.25 12V13.25H34H33.9661H33.9321H33.898H33.8639H33.8298H33.7956H33.7614H33.7271H33.6928H33.6585H33.6241H33.5897H33.5552H33.5206H33.4861H33.4515H33.4168H33.3821H33.3474H33.3126H33.2778H33.2429H33.208H33.173H33.1381H33.103H33.0679H33.0328H32.9977H32.9625H32.9273H32.892H32.8567H32.8213H32.7859H32.7505H32.715H32.6795H32.644H32.6084H32.5728H32.5371H32.5014H32.4657H32.4299H32.3941H32.3583H32.3224H32.2864H32.2505H32.2145H32.1785H32.1424H32.1063H32.0702H32.034H31.9978H31.9616H31.9253H31.889H31.8526H31.8163H31.7799H31.7434H31.7069H31.6704H31.6339H31.5973H31.5607H31.5241H31.4874H31.4507H31.414H31.3772H31.3404H31.3036H31.2667H31.2298H31.1929H31.1559H31.119H31.0819H31.0449H31.0078H30.9707H30.9336H30.8964H30.8592H30.822H30.7848H30.7475H30.7102H30.6729H30.6355H30.5981H30.5607H30.5233H30.4858H30.4483H30.4108H30.3733H30.3357H30.2981H30.2605H30.2228H30.1851H30.1474H30.1097H30.072H30.0342H29.9964H29.9586H29.9207H29.8829H29.845H29.8071H29.7691H29.7312H29.6932H29.6552H29.6171H29.5791H29.541H29.5029H29.4648H29.4267H29.3885H29.3503H29.3121H29.2739H29.2356H29.1974H29.1591H29.1208H29.0825H29.0441H29.0058H28.9674H28.929H28.8906H28.8521H28.8137H28.7752H28.7367H28.6982H28.6597H28.6212H28.5826H28.544H28.5054H28.4668H28.4282H28.3895H28.3509H28.3122H28.2735H28.2348H28.1961H28.1574H28.1186H28.0799H28.0411H28.0023H27.9635H27.9247H27.8858H27.847H27.8081H27.7692H27.7304H27.6915H27.6525H27.6136H27.5747H27.5357H27.4968H27.4578H27.4188H27.3798H27.3408H27.3018H27.2628H27.2238H27.1847H27.1457H27.1066H27.0675H27.0285H26.9894H26.9503H26.9112H26.872H26.8329H26.7938H26.7546H26.7155H26.6763H26.6372H26.598H26.5588H26.5196H26.4804H26.4412H26.402H26.3628H26.3236H26.2844H26.2452H26.2059H26.1667H26.1275H26.0882H26.049H26.0097H25.9705H25.9312H25.8919H25.8527H25.8134H25.7741H25.7348H25.6956H25.6563H25.617H25.5777H25.5384H25.4991H25.4598H25.4206H25.3813H25.342H25.3027H25.2634H25.2241H25.1848H25.1455H25.1062H25.0669H25.0276H24.9883H24.949H24.9097H24.8704H24.8312H24.7919H24.7526H24.7133H24.674H24.6348H24.5955H24.5562H24.5169H24.4777H24.4384H24.3992H24.3599H24.3207H24.2814H24.2422H24.203H24.1637H24.1245H24.0853H24.0461H24.0069H23.9677H23.9285H23.8893H23.8501H23.8109H23.7718H23.7326H23.6935H23.6543H23.6152H23.5761H23.5369H23.4978H23.4587H23.4196H23.3806H23.3415H23.3024H23.2634H23.2243H23.1853H23.1462H23.1072H23.0682H23.0292H22.9902H22.9513H22.9123H22.8734H22.8344H22.7955H22.7566H22.7177H22.6788H22.6399H22.601H22.5622H22.5233H22.4845H22.4457H22.4069H22.3681H22.3294H22.2906H22.2519H22.2131H22.1744H22.1357H22.0971H22.0584H22.0197H21.9811H21.9425H21.9039H21.8653H21.8268H21.7882H21.7497H21.7112H21.6727H21.6342H21.5957H21.5573H21.5189H21.4805H21.4421H21.4037H21.3653H21.327H21.2887H21.2504H21.2121H21.1739H21.1357H21.0975H21.0593H21.0211H20.983H20.9448H20.9067H20.8687H20.8306H20.7926H20.7545H20.7165H20.6786H20.6406H20.6027H20.5648H20.5269H20.4891H20.4512H20.4134H20.3757H20.3379H20.3002H20.2625H20.2248H20.1871H20.1495H20.1119H20.0743H20.0367H19.9992H19.9617H19.9242H19.8868H19.8494H19.812H19.7746H19.7373H19.7H19.6627H19.6254H19.5882H19.551H19.5138H19.4767H19.4396H19.4025H19.3654H19.3284H19.2914H19.2545H19.2175H19.1806H19.1437H19.1069H19.0701H19.0333H18.9966H18.9599H18.9232H18.8865H18.8499H18.8133H18.7768H18.7402H18.7038H18.6673H18.6309H18.5945H18.5581H18.5218H18.4855H18.4493H18.4131H18.3769H18.3407H18.3046H18.2686H18.2325H18.1965H18.1605H18.1246H18.0887H18.0529H18.017H17.9813H17.9455H17.9098H17.8741H17.8385H17.8029H17.7673H17.7318H17.6963H17.6609H17.6255H17.5901H17.5548H17.5195H17.4843H17.449H17.4139H17.3788H17.3437H17.3086H17.2736H17.2387H17.2037H17.1689H17.134H17.0992H17.0645H17.0297H16.9951H16.9605H16.9259H16.8913H16.8568H16.8224H16.788H16.7536H16.7193H16.685H16.6508H16.6166H16.5824H16.5483H16.5143H16.4803H16.4463H16.4124H16.3785H16.3447H16.3109H16.2772H16.2435H16.2098H16.1762H16.1427H16.1092H16.0758H16.0424H16.009H15.9757H15.9424H15.9092H15.8761H15.843H15.8099H15.7769H15.7439H15.711H15.6782H15.6453H15.6126H15.5799H15.5472H15.5146H15.4821H15.4496H15.4171H15.3847H15.3523H15.3201H15.2878H15.2556H15.2235H15.1914H15.1594H15.1274H15.0955H15.0636H15.0318H15H13.75V12C13.75 6.24342 12.0913 3.79276 9.90148 2.59841C8.73027 1.95963 7.28884 1.6108 5.58791 1.43177C4.24191 1.2901 2.7929 1.25955 1.25 1.25296V1.25812V1.31121V1.36531V1.42042V1.47652V1.53362V1.5917V1.65077V1.71082V1.77184V1.83383V1.89678V1.96069V2.02556V2.09138V2.15814V2.22584V2.29448V2.36405V2.43455V2.50597V2.5783V2.65155V2.7257V2.80075V2.87671V2.95355V3.03128V3.1099V3.18939V3.26976V3.351V3.4331V3.51606V3.59987V3.68453V3.77004V3.85639V3.94357V4.03158V4.12042V4.21008V4.30056V4.39184V4.48394V4.57683V4.67053V4.76501V4.86028V4.95634V5.05317V5.15077V5.24915V5.34828V5.44818V5.54883V5.65023V5.75237V5.85525V5.95887V6.06321V6.16829V6.27408V6.38059V6.48781V6.59573V6.70436V6.81368V6.92369V7.0344V7.14578V7.25784V7.37057V7.48397V7.59804V7.71276V7.82814V7.94416V8.06083V8.17814V8.29608V8.41465V8.53385V8.65366V8.77409V8.89513V9.01678V9.13903V9.26187V9.38531V9.50933V9.63393V9.75911V9.88487V10.0112V10.1381V10.2655V10.3935V10.522V10.6511V10.7807V10.9109V11.0416V11.1728V11.3045V11.4368V11.5695V11.7028V11.8366V11.9708V12.1056V12.2408V12.3765V12.5127V12.6494V12.7865V12.9241V13.0621V13.2006V13.3396V13.479V13.6188V13.7591V13.8997V14.0409V14.1824V14.3243V14.4667V14.6095V14.7526V14.8962V15.0401V15.1845V15.3292V15.4743V15.6197V15.7656V15.9117V16.0583V16.2052V16.3524V16.5V16.648V16.7962V16.9448V17.0937V17.2429V17.3925V17.5423V17.6925V17.843V17.9937V18.1447V18.2961V18.4477V18.5996V18.7517V18.9041V19.0568V19.2097V19.3629V19.5164V19.67V19.824V19.9781V20.1325V20.2871V20.4419V20.5969V20.7522V20.9076V21.0632V21.2191V21.3751V21.5313V21.6877V21.8443V22.001V22.1579V22.3149V22.4722V22.6295V22.787V22.9447V23.1025V23.2604V23.4185V23.5766V23.7349V23.8933V24.0518V24.2105V24.3692V24.528V24.6869V24.8459V25.0049V25.1641V25.3233V25.4825V25.6419V25.8013V25.9607V26.1202V26.2797V26.4393V26.5989V26.7585V26.9181V27.0778V27.2374V27.3971V27.5568V27.7165V27.8762V28.0358V28.1955V28.3551V28.5147V28.6743V28.8338V28.9933V29.1527V29.3121V29.4715V29.6308V29.79V29.9491V30.1082V30.2672V30.4261V30.5849V30.7437V30.9023V31.0608V31.2193V31.3776V31.5358V31.6939V31.8518V32.0096V32.1673V32.3249V32.4823V32.6395V32.7966V32.9535V33.1103V33.2669V33.4233V33.5796V33.7357V33.8915V34.0472V34.2027V34.358V34.5131V34.6679V34.8226V34.977V35.1312V35.2851V35.4389V35.5924V35.7456V35.8986V36.0513V36.2038V36.356V36.5079V36.6596V36.811V36.9621V37.1129V37.2634V37.4137V37.5636V37.7132V37.8625V38.0115V38.1601V38.3085V38.4565V38.6041V38.7514V38.8984V39.045V39.1913V39.3372V39.4827V39.6279V39.7727V39.9171V40.0612V40.2048V40.348V40.4909V40.6333V40.7754V40.917V41.0582V41.199V41.3393V41.4793V41.6188V41.7578V41.8964V42.0345V42.1722V42.3095V42.4462V42.5825V42.7183V42.8537V42.9885V43.1229V43.2567V43.3901V43.523V43.6553V43.7872V43.9185V44.0493V44.1796V44.3093V44.4385V44.5672V44.6953V44.8228V44.9498V45.0763V45.2022V45.3275V45.4522V45.5763V45.6999V45.8229V45.9452V46.067V46.1882V46.3088V46.4287V46.548V46.6667V46.7848V46.9023V47.0191V47.1352V47.2507V47.3656V47.4798V47.5934V47.7062V47.8184V47.93V48.0408V48.151V48.2605V48.3692V48.4773V48.5847V48.6913V48.7973V48.9025V49.007V49.1108V49.2138V49.3161V49.4177V49.5185V49.6186V49.7179V49.8164V49.9142V50.0112V50.1074V50.2028V50.2975V50.3913V50.4844V50.5767V50.6681V50.7588V50.8486V50.9376V51.0258V51.1132V51.1997V51.2854V51.3703V51.4543V51.5374V51.6197V51.7011V51.7817V51.8613V51.9401V52.0181V52.0951V52.1712V52.2465V52.3208V52.3943V52.4668V52.5384V52.6091V52.6789V52.7477V52.8156V52.8826V52.9486V53.0137V53.0778V53.141V53.2032V53.2644V53.3247V53.3839V53.4422V53.4995V53.5559V53.6112V53.6655V53.7188V53.7711V53.8224V53.8727V53.9219V53.9701V54.0173V54.0634V54.1085V54.1525V54.1955V54.2286L24 65.6024L46.75 54.2286V54.1883V54.1449V54.1005V54.055V54.0084V53.9608V53.9122V53.8625V53.8118V53.7601V53.7073V53.6536V53.5988V53.543V53.4861V53.4283V53.3695V53.3097V53.249V53.1872V53.1245V53.0608V52.9961V52.9305V52.8639V52.7963V52.7278V52.6584V52.588V52.5167V52.4445V52.3714V52.2973V52.2223V52.1464V52.0696V51.9919V51.9134V51.8339V51.7535V51.6723V51.5902V51.5072V51.4234V51.3387V51.2531V51.1667V51.0795V50.9914V50.9025V50.8127V50.7221V50.6307V50.5385V50.4455V50.3516V50.257V50.1616V50.0654V49.9683V49.8706V49.772V49.6726V49.5725V49.4717V49.37V49.2677V49.1645V49.0607V48.9561V48.8507V48.7447V48.6379V48.5303V48.4221V48.3132V48.2035V48.0932V47.9822V47.8705V47.758V47.645V47.5312V47.4168V47.3017V47.1859V47.0695V46.9524V46.8347V46.7164V46.5974V46.4778V46.3575V46.2366V46.1152V45.9931V45.8704V45.7471V45.6231V45.4987V45.3736V45.2479V45.1217V44.9948V44.8675V44.7395V44.611V44.4819V44.3523V44.2222V44.0915V43.9602V43.8285V43.6962V43.5634V43.4301V43.2962V43.1619V43.0271V42.8917V42.7559V42.6196V42.4828V42.3456V42.2078V42.0696V41.931V41.7918V41.6523V41.5122V41.3718V41.2309V41.0896V40.9478V40.8056V40.663V40.52V40.3766V40.2328V40.0885V39.9439V39.7989V39.6535V39.5077V39.3616V39.2151V39.0682V38.921V38.7734V38.6254V38.4771V38.3285V38.1796V38.0303V37.8806V37.7307V37.5804V37.4299V37.279V37.1278V36.9763V36.8246V36.6725V36.5202V36.3676V36.2147V36.0615V35.9081V35.7544V35.6005V35.4463V35.2919V35.1373V34.9824V34.8273V34.6719V34.5163V34.3606V34.2046V34.0484V33.892V33.7354V33.5786V33.4217V33.2645V33.1072V32.9497V32.7921V32.6343V32.4763V32.3182V32.1599V32.0015V31.843V31.6843V31.5255V31.3665V31.2075V31.0483V30.8891V30.7297V30.5702V30.4107V30.251V30.0913V29.9315V29.7716V29.6117V29.4517V29.2916V29.1315V28.9713V28.8111V28.6508V28.4905V28.3302V28.1698V28.0095V27.8491V27.6887V27.5283V27.3679V27.2075V27.0471V26.8867V26.7263V26.566V26.4057V26.2454V26.0852V25.925V25.7648V25.6047V25.4447V25.2847V25.1248V24.965V24.8052V24.6455V24.486V24.3265V24.1671V24.0077V23.8486V23.6895V23.5305V23.3716V23.2129V23.0543V22.8959V22.7375V22.5794V22.4213V22.2635V22.1058V21.9482V21.7908V21.6336V21.4766V21.3197V21.1631V21.0066V20.8504V20.6943V20.5385V20.3828V20.2274V20.0722V19.9172V19.7625V19.608V19.4537V19.2997V19.1459V18.9924V18.8391V18.6862V18.5334V18.381V18.2289V18.077V17.9254V17.7741V17.6231V17.4724V17.3221V17.172V17.0223V16.8729V16.7238V16.575V16.4266V16.2785V16.1308V15.9834V15.8364V15.6898V15.5435V15.3976V15.2521V15.1069V14.9622V14.8178V14.6738V14.5302V14.3871V14.2443V14.102V13.9601V13.8186V13.6775V13.5369V13.3967V13.257V13.1177V12.9789V12.8405V12.7026V12.5652V12.4282V12.2917V12.1557V12.0202V11.8852V11.7507V11.6166V11.4831V11.3501V11.2177V11.0857V10.9543V10.8234V10.693V10.5632V10.434V10.3053V10.1771V10.0495V9.92248V9.79602V9.67014V9.54484V9.42013V9.29601V9.17248V9.04956V8.92724V8.80553V8.68443V8.56396V8.44411V8.32489V8.2063V8.08836V7.97105V7.8544V7.7384V7.62306V7.50838V7.39437V7.28104V7.16838V7.05641V6.94512V6.83453V6.72463V6.61544V6.50695V6.39918V6.29212V6.18578V6.08017V5.9753V5.87115V5.76775V5.6651V5.5632V5.46205V5.36166V5.26204V5.16319V5.06511V4.96782V4.87131V4.77559V4.68066V4.58653V4.49321V4.40069V4.30899V4.21811V4.12805V4.03883V3.95043V3.86287V3.77616V3.69029V3.60528V3.52112V3.43783V3.3554V3.27384V3.19317V3.11337V3.03446V2.95645V2.87932V2.8031V2.72779V2.65339V2.5799V2.50734V2.43569V2.36498V2.29521V2.22637V2.15848V2.09154V2.02556V1.96053V1.89647V1.83338V1.77126V1.71012V1.64996V1.59079V1.53262V1.47544V1.41927V1.3641V1.30995V1.25682V1.25265Z" stroke="#E81C24" strokeWidth="2.5"/>
    <circle cx="24" cy="71.0015" r="3.75" stroke="#E81C24" strokeWidth="2.5"/>
    </svg>
    
    ),
});

export const NoResult = () => {

    const [cssNoResultWrapper] = useThemifiedComponent('no-result-wrapper');
    const [cssNoResultIcon] = useThemifiedComponent('no-result-icon');
    const [cssNoResultTitle] = useThemifiedComponent('no-result-title');
    const [cssNoResultDescription] = useThemifiedComponent('no-result-description');
    const [cssResetFilters] = useThemifiedComponent('reset-filters-button');

    const initialNamesList = useSelector(state => state.common.fetchedNamesList);
    const petNamesLoadMore = useSelector(state => state.view.petnames_portion);

    const dispatch = useDispatch(); 
    const { t } = useTranslation();   

    const resetFelters = () => {
        dispatch(toggleLoader());
        dispatch(setLetter(''));
        dispatch(setGender(t('filter gender both')));
        dispatch(setSelectedCategory(''));
        window.setTimeout(() => dispatch(toggleLoader()), 800);
        dispatch(loadAllPetnames(initialNamesList));
        dispatch(setNamesList(initialNamesList.slice(0, petNamesLoadMore)));
    }

    return (
        <div className={cssNoResultWrapper}>
            <Icon as={NoResultImage} className={cssNoResultIcon} />
            <h3 className={cssNoResultTitle}>
                {t('Empty search result title')}
            </h3>
            <p className={cssNoResultDescription}>
                {t('Empty search result description')}
            </p>
            <button 
                className={cssResetFilters}
                onClick={() => resetFelters()}
            >
                {t('Reset filters button')}
            </button>
        </div>
    )
}

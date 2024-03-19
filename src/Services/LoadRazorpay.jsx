
export default function LoadRazorpay() {
    return new Promise((res)=>{
        const script = document.createElement('script');
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        
        script.onload= ()=>{
          res(true);
        }
        script.onerror = ()=>{
          res(false)
        }
        document.body.appendChild(script);
      })
}

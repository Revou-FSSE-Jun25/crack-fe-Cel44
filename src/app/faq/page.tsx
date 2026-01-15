export default function FAQPage() {
    return (
        <div className="p-10">
        <h1 className="text-3xl font-bold mb-6">Frequently Asked Questions</h1>
  
        <div className="space-y-5">
            <div>
                <h2 className="text-xl font-semibold">What is TiBooth?</h2>
                <p>TiBooth is a website for buying cinema ticket online<br />
                    You can also check what other movies are playing, their schedule, and which cinema they are playing at. And you can also check upcoming movies!
                </p>

            </div>
    
            <div>
                <h2 className="text-xl font-semibold">How to buy tickets?</h2>
                <p> First, login into our website< br/>
                    Then, choose the movie you want to watch<br />
                    After that, choose the schedule and the cinema<br />
                    Finally, choose your seat and make the payment <br />
                    The ticket you have bought will be available for you in the History page
                </p>
            </div>
    
            <div>
                <h2 className="text-xl font-semibold">Can we purchase tickets for upcoming movies?</h2>
                <p>
                No
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Can I buy more than one ticket?</h2>
                <p>Yes, you can buy multiple movie tickets< br/>
                    Wether what you mean is multiple tickers for a movie or tickets for different movies<br/>
                    Make sure that the times do not overlap!
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Where are the data kept?</h2>
                <p>Local Storage</p>
            </div>
    
            <div>
                <h2 className="text-xl font-semibold">Can I have a refund?</h2>
                <p>
                Yes, but only at max 12 hours before the movie starts. <br />
                After that, refunds are not possible. <br />
                If refund is requested a day before, then a 20% fee will be deducted from the refund amount. <br />
                If refund is requested at least 2 days before, then no fee will be deducted.
                </p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Touché</h2>
                <p>:D</p>
            </div>

        </div>
      </div>
    )
}
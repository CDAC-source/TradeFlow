using Microsoft.AspNetCore.Mvc;

namespace TradeFlow.ContentService.Controllers
{
    [ApiController]
    [Route("api/content")]
    public class ContentController : ControllerBase
    {
        // ===================== ABOUT =====================
        [HttpGet("about")]
        public IActionResult GetAbout()
        {
            return Ok(new
            {
                projectName = "TradeFlow",
                version = "1.0",

                description =
                "TradeFlow is a modular business management platform designed to streamline and centralize core operational activities such as customer management, inventory tracking, service handling, sales analytics, and billing. " +
                "The system follows a service-oriented architecture to ensure scalability, maintainability, and seamless integration across multiple technologies.",

                features = new[]
                {
                    "Centralized Customer Management",
                    "Real-time Inventory & Spare Parts Tracking",
                    "Service Request Logging and Resolution",
                    "Sales Performance & Analytics",
                    "Invoice Generation and Billing Management"
                },

                technologyStack = new[]
                {
                    "React.js (Frontend)",
                    "Spring Boot (Core Backend)",
                    "ASP.NET Core Web API (.NET – About & Help Microservice)"
                },

                developedBy = "TradeFlow Development Team"
            });
        }

        // ===================== HELP =====================
        [HttpGet("help")]
        public IActionResult GetHelp()
        {
            return Ok(new[]
            {
                new
                {
                    question = "How do I add a new customer?",
                    answer = "Navigate to the Customer Management module and use the Add Customer option to register new customer details."
                },
                new
                {
                    question = "How can I manage inventory?",
                    answer = "Use the Inventory module to add, update, and monitor machines and spare part stock levels in real time."
                },
                new
                {
                    question = "How do I create an invoice?",
                    answer = "Invoices can be generated and managed through the Invoice & Billing module."
                },
                new
                {
                    question = "Who can access administrative features?",
                    answer = "Administrative features are restricted to users with the Admin role for security purposes."
                },
                new
                {
                    question = "How can I contact support?",
                    answer = "For assistance, please contact the system administrator or reach out at support@tradeflow.com."
                }
            });
        }
    }
}

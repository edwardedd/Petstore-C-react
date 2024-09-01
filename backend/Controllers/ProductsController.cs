using backend.Context;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ProductsController(ApplicationDbContext context)
        {
            _context = context;
        }

        //create
        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromBody] Dto.CreateUpdateDto dto)
        {
            var newProduct = new ProductEntity()
            {
                Brand = dto.Brand,
                Title = dto.Title,
            };

            await _context.AddAsync(newProduct);
            await _context.SaveChangesAsync();

            return Ok("Product saved!!!");
        }

        //read
        [HttpGet]
        public async Task<ActionResult<List<ProductEntity>>> GetAllProducts()
        {
            var products  = await _context.Products.ToListAsync();
            return Ok(products);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProductEntity>> GetProductById([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if(product is null)
            {
                return NotFound("Product not found!");  
            }
            return Ok(product);
        }
        //update
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProduct([FromRoute] long id, [FromBody] Dto.CreateUpdateDto dto)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product is null)
            {
                return NotFound("Product not found!");
            }
            product.Title = dto.Title;
            product.Brand = dto.Brand;

            await _context.SaveChangesAsync();
            return Ok("Product update successfully");

        }

        //delete
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProduct([FromRoute] long id)
        {
            var product = await _context.Products.FirstOrDefaultAsync(x => x.Id == id);
            if (product is null)
            {
                return NotFound("Product not found!");
            }
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return Ok("Product deleted!");
        }
    }
}
